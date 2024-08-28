function* createIdGenerator() {
  let id = 4;
  while (true) {
    yield id++;
  }
}

const idGenerator = createIdGenerator();

export function getNewId(): number {
  return idGenerator.next().value as number;
}
