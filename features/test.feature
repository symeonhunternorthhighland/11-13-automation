@test
Feature: Test

    This is a feature to test the configuration

    Scenario: Visit the Home page
        Given I visit the homepage

@test
Feature: Login

Before(({ login }) => {
    login('user'); //login user session
});

//log in for one scenario
Scenario('log me n', ( {I, login } ) => {
    login('admin');
    I.see('I am logged in');
});
