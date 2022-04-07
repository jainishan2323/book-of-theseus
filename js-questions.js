/**
 * Implement the classNames function to return a string with the classes
 *
 * Usage examples:
 * classNames('foo'); // 'foo'
 * classNames('foo', 'bar'); // 'foo bar'
 * classNames(['foo', 'bar']); // 'foo bar'
 * classNames({ foo: true }); // 'foo'
 * classNames({ foo: false, bar: true }); // 'bar'
 * classNames('foo', ['bar', 'baz']); // 'foo bar baz'
 * classNames('foo', { bar: true, baz: false }); // 'foo bar'
 * classNames([{ foo: true, bar: false }, 'baz'], 'qux'); // 'foo baz qux'
 * classNames(undefined, false, 5, 'foo'); // 'foo'
 * classNames(); // ''
 * classNames(undefined, false, true, 5, function () {}, {}, [], "")
 * classNames(
    "foo",
    ["bar"],
    { baz: true },
    [["qux"], { quux: true }, [{ corge: true }]],
    [[[["grault"]], { garply: true }]]
  )
 */

function classNames() {
  let result = "";
  for (let i = 0; i < arguments.length; i++) {
    if (typeof arguments[i] === "string") {
      result += " " + arguments[i];
      result = result.trim();
    } else if (Array.isArray(arguments[i])) {
      // will return the final string
      const temp = classNames(...arguments[i]);
      result += " " + temp;
      result = result.trim();
    } else if (typeof arguments[i] === "object") {
      Object.keys(arguments[i]).forEach((key) => {
        if (arguments[i][key]) {
          result += " " + key;
          result = result.trim();
        }
      });
    }
  }
  return result;
}
