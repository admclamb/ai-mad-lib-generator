const request = require("supertest");
const app = require("../src/app");
const { OpenAI } = require("openai");

describe("POST /generate/madlib", () => {
  it("Should return a mad lib with the correct number of tokens and replaced placeholders", async () => {
    const response = await request(app)
      .post("/generate/madlib")
      .send({
        template:
          "The [Adjective_1] brown [Noun_1] [Adverb_1] [Verb_1] the lazy dog's [Noun_2].",
        words: {
          Adjective_1: ["quick", "slow"],
          Noun_1: ["fox", "dog"],
          Adverb_1: ["quickly", "slowly"],
          Verb_1: ["jumps", "runs"],
          Noun_2: ["tail", "leg"],
        },
      })
      .expect(200);

    expect(response.body).toHaveProperty("madlib");
    expect(response.body.madlib).toBeDefined();
    expect(response.body.madlib.split(" ").length).toBeGreaterThanOrEqual(50);
    expect(response.body.madlib.split(" ").length).toBeLessThanOrEqual(100);
  });
});
