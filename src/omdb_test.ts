import {
  assertEquals,
  assertExists,
} from 'https://deno.land/std@0.222.1/assert/mod.ts';
import { getTitle } from './omdb.ts';

Deno.test('Get movie title by name, Spider-Man (2002) id: tt0145487', async () => {
  const title = await getTitle({ titleOrId: 'Spider-Man' });

  assertExists(title);
  assertEquals(title.Title, 'Spider-Man');
  assertEquals(title.Released.getFullYear(), 2002);
  assertEquals(typeof title.imdbVotes, 'number');
});

Deno.test('Get movie title by id, Spider-Man (2002) id: tt0145487', async () => {
  const title = await getTitle({ titleOrId: 'tt0145487' });

  assertExists(title);
  assertEquals(title.Title, 'Spider-Man');
  assertEquals(title.Released.getFullYear(), 2002);
});

Deno.test('Get TV show title by name, Breaking Bad id: tt0903747', async () => {
  const title = await getTitle({ titleOrId: 'Breaking Bad' });

  assertExists(title);
  assertEquals(title.Title, 'Breaking Bad');
  assertEquals(title.Released.getFullYear(), 2008);
  assertEquals(title.totalSeasons, 5);
  assertEquals(title.Genre.includes('Thriller'), true, 'genre');
  assertEquals(title.Writer.includes('Vince Gilligan'), true, 'writer');
  assertEquals(title.Actors.includes('Bryan Cranston'), true, 'actors');
  assertEquals(title.Director.includes('N/A'), true, 'director');
});

Deno.test('Get TV show title by id, Breaking Bad id: tt0903747', async () => {
  const title = await getTitle({ titleOrId: 'tt0903747' });

  assertExists(title);
  assertEquals(title.Title, 'Breaking Bad');
  assertEquals(title.Released.getFullYear(), 2008);
  assertEquals(title.totalSeasons, 5);
  assertEquals(title.Genre.includes('Thriller'), true, 'genre');
  assertEquals(title.Writer.includes('Vince Gilligan'), true, 'writer');
  assertEquals(title.Actors.includes('Bryan Cranston'), true, 'actors');
  assertEquals(title.Director.includes('N/A'), true, 'director');
});
