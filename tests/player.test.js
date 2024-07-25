import Player from "../modules/player.js";

it('creates a player with a name', () => {
  const testPlayer = new Player('Test');
  expect(testPlayer.name).toBe('Test');
});
