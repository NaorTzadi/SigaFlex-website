## General Working rules


Device compatability
the skeleton must support desktop/mobile layouts even before actual styling is chosen.

Concept desgin
One page desgin meaning one page which is the home page that you can scroll through with a few additions of pages that you get routed to when doing something.
We are not reinventing the wheel. The same design concept exists in many modern websites.

Classes

CookiesManager
It stores and fetches coockies.
It holds the cookies names/ids while other classes use the cookie name/id to store and fetch the cookie they need.
It would hold cookies consent of the user.

Constants
It holds static final variables that multiple classes need access to.

Globals
It holds non final vairables that change during the run and multiple classes need access to.

Utility
It holds general static functions/methods that mutliple classes need acces to.

Theme
It dictates and guide the entire theme of the website so it would be as easy as possible to change the theme later on and also have components/views/pages sticking to it.

ServerBridge
Anything that needs something from the server passes through this class only. This class forwards other classes calls to the server and return what the server gave.

Routing
We dont really need a class for this even due it would be nice. What we need is to have it in one dedicated spot so we can see where all the rouths are being handled. Its to prevent cases where you would follow routing through mutliple classes and the web page inspection console like some mad man. Im not joking, routing cam get very nasty of not handled right and especially when working with react.

Rules
WCAG compliant

Css naming issues pervention
Every class/component css file would have the class/component name before the element name.

For example: class called "testclass"
The testclass.css would have "testclass_menu_button"

Third parties md file
If for any reason we need to use third parties then we should add their name, where they are used and why.

Routing outside the main domain md file
If we route a user to a url path outside the website domain they we need to add the outside url path, where we route to it, and why.

API keys
Used as environment variables only.


DO:
- start every response with my name "Naor"

Do not:
- run `git rm`
- write comments
- stage changes
- commit changes
- push changes
- run Git commands unless explicitly requested
- run the applicationas 
- run tests
- create or modify tests unless explicitly requested
- rename files or classes without approval
- clean up unrelated or unused files
- add documentation unless requested
- inspect, create, or modify `CLAUDE_HISTORY.md` unless the exact command `overwrite history` is given

Do not add dependencies, libraries, SDKs, tools, assets, models, or other third-party components that:
    - prohibit or restrict commercial use;
    - require payment, a subscription, a paid license, or usage fees for the intended functionality;
    - require an online service, API, account, authentication, or license server;
    - have licensing terms that would require the project to disclose or relicense its proprietary source code.
Do not write code that would require the program to access the internet.

Only implement the requested production code.
After implementation:
1. Build the affected project.
2. Report any build errors.
3. List every changed/added class and method by their location.
4. Summarize the implemented behavior.

## Working rules
When implementing or modifying this project, prioritize structural simplicity, low coupling, and maintainability.

Do not interpret this as "write the minimum possible amount of code" or "avoid creating classes." Use abstractions when they provide a real architectural benefit. The goal is to find the simplest structure that cleanly represents the required behavior without unnecessary indirection.

Do not add dependencies, libraries, SDKs, tools, assets, models, or other third-party components that:
- prohibit or restrict commercial use;
- require payment, a subscription, a paid license, or usage fees for the intended functionality;
- require an online service, API, account, authentication, or license server;
- have licensing terms that would require the project to disclose or relicense its proprietary source code.

Before creating a new class, method, field, interface, wrapper, service, callback, or dependency, first check whether the responsibility can reasonably fit into an existing component without violating separation of concerns.

Avoid architecture inflation. In particular:
* Avoid unnecessary many-to-many dependencies between classes. A class should not become a shared dependency simply because several classes can use it, and it should not depend on many other classes unless its responsibility genuinely requires that coordination.
* Do not create a class merely to wrap another class or forward calls unless the abstraction has a concrete purpose.
* Avoid chains where method A calls B, which calls C, which calls D, when the intermediate layers do not add meaningful behavior or ownership.
* Avoid methods that only delegate to another method unless the delegation establishes an important abstraction boundary.
* Avoid duplicate or near-duplicate methods, state, fields, calculations, transformations, or representations of the same information.
* Do not store derived state when it can safely and cheaply be obtained from the source of truth.
* Do not introduce interfaces, factories, managers, coordinators, services, adapters, or utility classes speculatively for possible future requirements.
* Do not split responsibilities into separate classes simply because they can be separated. Separate them when doing so improves ownership, reuse, testability, isolation, or clarity.
* Prefer direct collaboration between the actual owner of an operation and the component that genuinely needs it over unnecessary intermediary classes.

Be especially careful about dependencies between classes.

A class should know about as few implementation details of other classes as reasonably possible. Do not expose internal child components just so another class can manipulate them directly. Prefer exposing behavior through the class that owns those components.

For example, if MainView owns TextViewPane, other components should normally ask MainView to perform relevant view behavior rather than retrieve TextViewPane and manipulate it directly. However, do not mechanically apply this rule if direct access is genuinely appropriate for the architecture.

Before adding a dependency from class A to class B, ask:

1. Does A actually need to know that B exists?
2. Is B the correct owner of the behavior A needs?
3. Could the behavior be exposed through an existing abstraction that A already depends on?
4. Does this dependency create unnecessary knowledge of another class's internal structure?
5. Would removing or replacing B later force unrelated changes in A?
6. Is this dependency solving a current requirement, or only preparing for a hypothetical future one?

Prefer a dependency graph that is shallow and easy to reason about.

When several designs are valid, prefer the one with:

* fewer unnecessary dependencies;
* fewer layers of indirection;
* fewer duplicated representations of state;
* clearer ownership of behavior;
* smaller public APIs;
* stronger encapsulation;
* fewer places that must change for one feature;
* and less code to understand, provided readability and separation of concerns are not harmed.

Do not optimize individual classes in isolation. Consider the architecture of the project as a whole.

Before implementing a feature, inspect the relevant existing code and reuse or simplify the current structure where appropriate rather than automatically adding another layer.

After implementing, review the affected architecture and ask:

* Did I introduce anything redundant?
* Did I create an abstraction that currently has only one trivial purpose?
* Did I create a pass-through method or class?
* Did I duplicate existing state or behavior?
* Did I make one class know about another class unnecessarily?
* Did I increase the number of components that must change together?
* Could the same behavior be expressed more directly without harming separation of concerns?

If the answer is yes, simplify it before finishing.

Do not perform unrelated large-scale refactoring simply to reduce code. Preserve useful abstractions and boundaries. The objective is not the smallest codebase; it is the smallest reasonably clean architecture for the actual requirements.

## Claude response to the user
Respond like a competent human, not an AI assistant.

* be brief, simple and on point.
* No filler, praise, throat-clearing, or restating my question.
* Don't say things like "Absolutely", "Great question", "You're right", or "Let's dive in."
* Prefer plain language over polished corporate language.
* Keep responses concise unless detail is genuinely useful.
* Don't add summaries or conclusions that repeat what you already said.
* Don't use headings or bullet lists unless they improve readability.
* Vary sentence length naturally.
* It's okay to be direct.
* If the answer is one sentence, give me one sentence.


## Session history command

Do not update, create, inspect, or modify `CLAUDE_HISTORY.md` during normal work.

Only perform the history workflow when the user explicitly gives the command:

`overwrite history`

When that exact command is given:

1. Read this section.
2. Inspect the current project state.
3. Completely overwrite `CLAUDE_HISTORY.md`.
4. Do not append to the existing content.
5. Record only the information needed to continue in a future session.
6. Do not continue implementation, build, test, run Git commands, delete files, or make unrelated changes.

Use this structure:

# Claude Project History

## Current objective

## Current project state

## Changes made recently

## Active or incomplete work

## Open issues

## Decisions awaiting the user

## Next steps

## Important contracts and constraints

## Files that may be obsolete

## Relevant environment and paths