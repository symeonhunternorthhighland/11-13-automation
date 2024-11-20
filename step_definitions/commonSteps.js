const { I } = inject();
let prompt;

When("I visit the homepage", () => {
  I.amOnPage("/");
  I.wait(2);
});

When("I login as {string}", (user) => {
  login("user");
});