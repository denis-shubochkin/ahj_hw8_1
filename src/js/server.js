const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');
const { streamEvents } = require('http-event-stream');
const uuid = require('uuid');
const Router = require('koa-router');

const router = new Router();


const app = new Koa();

app.use(koaBody({
  urlencoded: true,
  multipart: true,
  json: true,
}));

// eslint-disable-next-line consistent-return
app.use(async (ctx, next) => {
  const origin = ctx.request.get('Origin');
  if (!origin) {
    // eslint-disable-next-line no-return-await
    return await next();
  }

  const headers = { 'Access-Control-Allow-Origin': '*' };

  if (ctx.request.method !== 'OPTIONS') {
    ctx.response.set({ ...headers });
    try {
      return await next();
    } catch (e) {
      e.headers = { ...e.headers, ...headers };
      throw e;
    }
  }

  if (ctx.request.get('Access-Control-Request-Method')) {
    ctx.response.set({
      ...headers,
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
    });

    if (ctx.request.get('Allow-Control-Request-Headers')) {
      ctx.response.set('Access-Control-Allow-Headers', ctx.request.get('Allow-Control-Request-Headers'));
    }
    ctx.response.status = 204;
  }
});

router.get('/football', async (ctx) => {
  streamEvents(ctx.req, ctx.res, {
    async fetch(lastEventId) {
      console.log(lastEventId);
      return [];
    },
    stream(sse) {
      let count = 0;
      function createEvent() {
        const num = Math.floor(Math.random() * 101);
        const date = new Date().toLocaleString();
        if (count === 50) {
          sse.sendEvent({
            id: uuid.v4(),
            data: JSON.stringify({ date, text: 'Игра окончена', type: 'end' }),
            event: 'end',
          });
        }
        if (num <= 50) {
          sse.sendEvent({
            id: uuid.v4(),
            data: JSON.stringify({ date, text: 'Идет перемещение мяча по полю, идет атака с одной и с другой стороны', type: 'action' }),
            event: 'action',
          });
        } else if (num > 50 && num <= 90) {
          sse.sendEvent({
            id: uuid.v4(),
            data: JSON.stringify({ date, text: 'Назначен штрафной удар', type: 'freekick' }),
            event: 'freekick',
          });
        } else {
          sse.sendEvent({
            id: uuid.v4(),
            data: JSON.stringify({ date, text: 'ГОЛ!!!!!!!!!!!!!', type: 'goal' }),
            event: 'goal',
          });
        }
        count += 1;
      }
      setInterval(createEvent, 5000);
    },
  });
  ctx.respond = false;
});

app.use(router.routes()).use(router.allowedMethods());

// eslint-disable-next-line no-unused-vars
const port = process.env.PORT || 7070;
// eslint-disable-next-line no-unused-vars
const server = http.createServer(app.callback()).listen(port);
