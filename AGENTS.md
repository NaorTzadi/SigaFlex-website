
# specific project working rules/guidlines

Device compatability
the skeleton must support desktop/mobile layouts even before actual styling is chosen.

Concept design
One page design meaning one page which is the home page that you can scroll through with a few additions of pages that you get routed to when doing something.
We are not reinventing the wheel. The same design concept exists in many modern websites.

## Classes

- CookiesManager
It stores and fetches cookies.
It holds the cookies names/ids while other classes use the cookie name/id to store and fetch the cookie they need.
It would hold cookies consent of the user.

- Constants
It holds static final variables that multiple classes need access to.

- Globals
It holds non final variables that change during the run and multiple classes need access to.

- Utility
It holds general static functions/methods that multiple classes need access to.

- Theme
It dictates and guide the entire theme of the website so it would be as easy as possible to change the theme later on and also have components/views/pages sticking to it.

- ServerBridge
Anything that needs something from the server passes through this class only. This class forwards other classes calls to the server and return what the server gave.

- Routing
We dont really need a class for this even due it would be nice. What we need is to have it in one dedicated spot so we can see where all the rouths are being handled. Its to prevent cases where you would follow routing through mutliple classes and the web page inspection console like some mad man. Im not joking, routing cam get very nasty of not handled right and especially when working with react.


## WCAG compliant

## Css naming issues prevention
Every class name in a component's own stylesheet starts with that component's name, so two
components can never define the same class. TestClass owns testclass.css, and every selector
in it reads testclass_menu_button. The separator is an underscore; a variant of an element
is appended with a hyphen, as in testclass_menu_button-current.

The component never writes that prefix as a literal. It declares its name once, at module
level below the imports, and builds every name from it:

    const className = "testclass";

    <div className={className}>
      <button className={`${className}_menu_button`}>

Module level rather than inside the function, because helper components in the same file
need it too. The root element is className={className} on its own.

Shared stylesheets are the exception, because their prefix belongs to the sheet and not to
any one component: page_* from page.css, fa_* from theme.css, and account_* from account.css
wherever Account itself is not the component. Those stay literal strings. Icon is the other
exception: it takes a className prop from its callers, so a const of that name would shadow
it, and its single class is already its own name.

## Third-party index
Record third-party names, versions, licences, licence paths, where they are used and why in LICENSES_INDEX_MAP.md.

## Routing outside the main domain md file
If we route a user to a url path outside the website domain they we need to add the outside url path, where we route to it, and why.

## API keys
Used as environment variables only.

## Legal safeguards
SAFEGUARDS.md at the website root lists every protection that exists to reduce legal risk:
what it guarantees, where it lives, and why.

- Before editing or removing code in a file listed in SAFEGUARDS.md, read that safeguard's entry.
- A safeguard's implementation may be refactored, moved, or improved, but its protection must
  stay intact. Never weaken, bypass, or remove a protection unless the user explicitly authorizes
  that specific change.
- When code that a safeguard covers changes, update its entry in the same change.
- When adding anything that serves as a legal protection, register it as a new safeguard in the
  same change.
- Every implementation site carries a marker beside the protected code, in the form
  `SAFEGUARD PRIV-001 — see SAFEGUARDS.md`. Markers are an explicit exception to the
  no-comments rule. Keep them next to the code they protect; move them when it moves.


# General Working rules

Do not perform any of the following unless explicitly requested by the user:
- run `git rm`
- write comments
- stage, commit or push changes
- run Git commands unless explicitly requested
- run the application
- run tests
- create or modify tests unless explicitly requested
- rename files or classes without approval
- clean up or modify unrelated or unused files
- add documentation unless requested
- Do not write code that would require the program to access the internet.

Do not add dependencies, libraries, SDKs, tools, assets, models, or other third-party components that:
- prohibit or restrict commercial use;
- require payment, a subscription, a paid license, or usage fees for the intended functionality;
- require an online service, API, account, authentication, or license server;
- have licensing terms that would require the project to disclose or relicense its proprietary source code.


Only implement the requested production code.
After implementation:
1. Build the affected project.
2. Report any build errors.
3. List every changed/added class and method by their location.
4. Summarize the implemented behavior.

## Working rules
if you need something from me that you cannot do on your own, write "👦"

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
* Start every response with `Naor`.
* Be concise, direct, and practical.
* Answer the actual question immediately.
* Do not use filler, praise, conversational padding, or artificial enthusiasm.
* Do not restate or paraphrase the user's request unless clarification is necessary.
* Avoid phrases such as `Absolutely`, `Great question`, `You're right`, `Let's dive in`, or similar opening filler.
* Prefer plain, natural language over corporate, overly polished, or AI-style wording.
* Use headings, bullets, tables, or numbered steps only when they make the response easier to understand.
* Do not create sections merely to make a short answer look structured.
* Keep simple answers short. If one sentence fully answers the question, use one sentence.
* Give additional explanation only when it materially helps with correctness, implementation, tradeoffs, risks, or decision-making.
* When reporting completed implementation work, include only the information required by the working rules and anything important the user should know.
* Do not repeat the same information in a summary or conclusion after already explaining it.
* Be direct when something is wrong, uncertain, unsupported, or cannot be verified.

