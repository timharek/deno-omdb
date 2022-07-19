import { options, printHelp } from './deps.ts';
import { CONFIG, FLAGS } from './config.ts';
import { getMovie, slugify } from './omdb.ts';

if (FLAGS.help) {
  printHelp(CONFIG);
  Deno.exit(1);
}

if (!FLAGS.api) {
  console.error('No API key provided.');
  Deno.exit(1);
}

if ((FLAGS.title && FLAGS.id) || (FLAGS.id && FLAGS.title)) {
  console.error('Cannot use ID in conjuction with title');
  Deno.exit(1);
}

if (FLAGS.api) {
  options.api = FLAGS.api;
}

if (FLAGS.short) {
  options.format = 'short';
}

if (FLAGS.title) {
  console.log(await getMovie({ title: slugify(FLAGS.title) }, options.format));
}

if (FLAGS.id) {
  console.log(await getMovie({ id: FLAGS.id }, options.format));
}
