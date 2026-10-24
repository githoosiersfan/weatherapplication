
describe("weatherShowFn", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <h3 id="city-name"></h3>
      <p id="date"></p>
      <p id="temperature"></p>
      <p id="description"></p>
      <p id="wind-speed"></p>
      <div id="weather-info"></div>
      <button id="city-input-btn"></button>
    `;

    // Assumes jQuery and Moment.js are loaded
    // and weatherShowFn is available to the test.
    jest.spyOn($.fn, "fadeIn").mockReturnThis();
    jest.spyOn($.fn, "on").mockReturnThis();
    jest.spyOn($.fn, "html").mockImplementation(function (value) {
      if (value === undefined) return this[0]?.innerHTML;
      return this.each(function () {
        this.innerHTML = value;
      });
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("rounds temperature to the nearest whole degree", () => {
    const data = {
      name: "London",
      main: { temp: 21.7 },
      weather: [{ description: "clear sky" }],
      wind: { speed: 5.5 }
    };

    weatherShowFn(data);

    expect($("#temperature").text()).toBe("22°C");
  });
});
