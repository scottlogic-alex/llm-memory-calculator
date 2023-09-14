export enum OptimizerFamily {
    Adam = 'Adam',
    // Adafactor will take a bit of work for us to get the inputs, because instead of n*m you need n+m
    // https://arxiv.org/abs/1804.04235
    Adafactor = 'Adafactor',
}