const { I } = inject();

When("I visit the homepage", () => {
  I.amOnPage("/");
  I.wait(2)
});

Given("I visit the homepage", () => {
  I.amOnPage("/");
  I.wait(2)
});
