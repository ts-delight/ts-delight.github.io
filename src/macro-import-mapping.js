export const macroImports = {
  "@ts-delight/pipe.macro": {
    resolvedPath: require.resolve("@ts-delight/pipe.macro"),
    imported: require("@ts-delight/pipe.macro"),
    const: "Pipe",
    example: `
    const increment = (i) => i + 1;

    const fn = Pipe().thru(increment).thru(i => i - 1)();

    console.log(fn(1));
    `
  },
  "@ts-delight/async-to-generator.macro": {
    resolvedPath: require.resolve("@ts-delight/async-to-generator.macro"),
    imported: require("@ts-delight/async-to-generator.macro"),
    const: "a2g",
    example: `
    const genFn = a2g(async function() {
      await Promise.resolve("hello");
    })
    `
  },
  "@ts-delight/fluent-react.macro": {
    resolvedPath: require.resolve("@ts-delight/fluent-react.macro"),
    imported: require("@ts-delight/fluent-react.macro"),
    const: "R",
    example: `
    const ProfileContainer = () => 
      R.div()
        .id("profile-container")
        .className("container")("Hello")
    `
  },
  "@ts-delight/inject-display-name.macro": {
    resolvedPath: require.resolve("@ts-delight/inject-display-name.macro"),
    imported: require("@ts-delight/inject-display-name.macro"),
    const: "injectDN",
    example: `
    const HoC = (name) => () => 
      React.createElement("div", {}, name);

    const DynamicComponent = injectDN(HoC("me"));
    `
  },
  "@ts-delight/debug.macro": {
    resolvedPath: require.resolve("@ts-delight/debug.macro"),
    imported: require("@ts-delight/debug.macro"),
    const: "debug",
    example: `
      const testFn = () => {
        debug.allInScope();
        const a = 10;
        const b = 10;
      }
    `
  },
  "@ts-delight/if-expr.macro": {
    resolvedPath: require.resolve("@ts-delight/if-expr.macro"),
    imported: require("@ts-delight/if-expr.macro"),
    const: "If",
    example: `
    const faithInScience = If (1 === 1)
      .then("Math is still valid")
      .else("We are in an alternative universe")
    `
  },
  "@ts-delight/switch-expr.macro": {
    resolvedPath: require.resolve("@ts-delight/switch-expr.macro"),
    imported: require("@ts-delight/switch-expr.macro"),
    const: "Switch",
    example: `
    const sound = "bark";
    const animal = Switch (sound) 
      .case("bark", "Dog")
      .case("meow", "Cat")()
    `
  }
};
