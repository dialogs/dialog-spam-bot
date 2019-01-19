/*
 * Copyright 2018 Dialog LLC <info@dlg.im>
 */

import ms from 'ms';
import { interval, Subscription } from 'rxjs';
import { take, flatMap } from 'rxjs/operators';
import Bot, { PeerMap } from '@dlghq/dialog-bot-sdk';
import config from './config';
import text from './onegin.json';

const bot = new Bot(config);

const help = `
Hello. Here is control commands:
\`\`\`
/start [delay] [count]
  [delay] Spam interval (500ms/1sec/10min).
  [times] Stop automaticly after [count] times.

/stop
\`\`\`
`.trim();

const context = new PeerMap<Subscription>();

bot
  .onMessage(async (message) => {
    if (message.content.type !== 'text') {
      await bot.sendText(message.peer, help);
      return;
    }

    const state = context.get(message.peer);
    const matches = message.content.text.match(/^\/start(?: (\d+(?:ms|sec|min)))?(?: (\d+))?$/i);
    if (matches) {
      if (state) {
        return;
      }

      const delay = ms(matches[1] || '500ms');
      const times = parseInt(matches[2], 10) || 100;

      await bot.sendText(message.peer, `Start posting ${times} messages with ${ms(delay)} interval. Stop me using \`/stop\` command.`);

      const task = interval(delay)
        .pipe(
          take(times),
          flatMap(async (i) => {
            const line = text[i % text.length];
            await bot.sendText(message.peer, line);
          })
        )
        .subscribe({
          error: (error) => console.error(error),
          complete: () => context.delete(message.peer)
        });

      context.set(message.peer, task);
      return;
    }

    if (message.content.text === '/stop') {
      if (state) {
        state.unsubscribe();
        context.delete(message.peer);
        await bot.sendText(message.peer, 'Stop posting.');
        return;
      }
    }

    await bot.sendText(message.peer, help);
  })
  .toPromise()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
