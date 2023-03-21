import { truncate } from ".";

describe("truncate", () => {
  describe("when lenght and ending params is not specified", () => {
    test("return the same text when it's less than 100 charcters long", () => {
      const text = "shorttext";
      const result = truncate(text);

      expect(result).toEqual(text);
    });

    test("return a text with length 100 and ends with ...", () => {
      const text = makeLongText();
      const result = truncate(text);

      expect(result).toHaveLength(100);
      expect(result).toMatch(/.*\...$/);
    });
  });

  describe("when length is 50 and ending is .", () => {
    const length = 50;
    const ending = ".";

    test("return the same text when it's less than 50 charcters long", () => {
      const text = "shorttext";
      const result = truncate(text, length, ending);

      expect(result).toEqual(text);
    });

    test("return a text with length 50 and ends with .", () => {
      const text = makeLongText();
      const result = truncate(text, length, ending);

      expect(result).toHaveLength(50);
      expect(result).toMatch(/.*\.$/);
    });
  });
});

const makeLongText = () => {
  return "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam accusantium nostrum quam quo eos odio quod quisquam fugiat veritatis totam, in distinctio recusandae cupiditate assumenda nulla velit expedita. Id, debitis.";
};
