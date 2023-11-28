---
title: "Rails In 2023"
date: 2023-11-10T10:00:00+02:00
draft: false
tags: ["rails", "ruby"]
categories: ["rails", "development", "strategy"]
---

{{< figure src="/images/rails_is_back.jpg" alt="Rails is back!" title="Imagesource: ChatGPT / DALL·E 3" >}}

# What?

In 2006, I stumbled upon Ruby on Rails by chance. As for many other developers, this framework should shape my career path for many years.

Today, in 2023, I'm returning to Rails – or it seems like Rails is returning to me. Rarely has a reunion felt so good and so right. But are there actually good reasons in 2023 to work with a web framework that's now 20 years old? What about the widely discussed disadvantages and counterarguments? Over the past few weeks, I've had the opportunity to technically engage with these and related questions, and my conclusion is:

Anyone who starts a new project from scratch in 2023 and does not at least consider Ruby on Rails as a serious option may regret missing out on an opportunity in terms of cost-effectiveness, technical innovation, and organizational efficiency.

# Cost Effectiveness

Rails in its current version 7 is an incredibly versatile piece of software. Those familiar with previous versions will immediately feel at home and can write productive code from the first minute. The framework has been expanded and improved for over 20 years; strengths have been highlighted, and weaknesses eliminated. However, the core and the fundamental approach to RESTful design have remained the same – if you've worked with Rails 3, you can become almost immediately productive with Rails 7.

The integration of new developments like Action Mailbox, Action Text, Action Cable, Parallel Testing, Multiple Database Support, Active Job, Credentials, Zeitwerk Autoloading, Encrypted Secrets, and several more, increase productivity in implementing recurring standard tasks in web development in the Rails way. The principle of _Convention over Configuration_ remains the mantra that makes life much easier for developers than in other environments.

Assuming knowledge of the framework and its nuances, the productivity is impressive. The argument that Rails is only suitable for quick project starts and must be replaced by other technologies for long-term performance contradicts both logic and the facts, according to at least my experience. On the contrary, a Rails application built according to its paradigms scales well during development with even hundreds of developers, as well as in container-based, performant, and cost-efficient operation. GitHub and Shopify are just two of countless examples that Rails can serve as an excellent foundation for large digital products.

The significant speed advantage in development and feature release creates competitive advantages. Especially in a world where modern applications are _living products_, do not have an end of a life cycle but are constantly being further developed.

# Technical Innovation

When you delve into the development of web technologies in detail, you can spark extreme controversies depending on your perspective. One such controversy is that with the development of web technologies over the last 20 years, we've come full circle.

The last real innovation after year long server-side rendering followed by spagetthi SPAs was React with its component-based architecture, and the paradigm that _UI = function(state)_. This idea solved a whole class of problems and came with a big promise: to make the development of complex web applications much easier.

However, today – 10 years later – very little of that promise remains. Instead, we are struggling with massively increased complexity in almost all phases of the application lifecycle. This complexity is obvious to those willing to look. Others continue to throw SPA technology at every problem as if the requirements for applications of different kinds were not at least as varied as their use cases.

Of course, we have seen great innovations, and I don't want to downplay the creative heights and efforts invested. Packagers, transpilers, linters, state managers, frontend routers, styled components, and finally TypeScript have each solved one or more problems. However, they have almost exclusively solved problems that we didn't have before.

The state of development in _how_ we develop web applications has not really been positively influenced by these innovations. As a result, after megabyte-sized SPAs, we have come back to server-side rendering, sending requests to the backend, receiving JSON in response, and rendering it into HTML on the client. The advantage: The browser has no render-lock, and the user can admire the graphical finesse of a beautifully hand-crafted spinner while waiting for the requested data.

All this frontend finesse was never Rail's thing. Complex state handling in the frontend was offloaded to a corresponding JS bundle, resulting in the worst of both worlds. But those times are over. What Rails has to offer with Hotwire / Turbo and Stimulus is not just impressive. It exactly covers the range of application requirements where JS-based frameworks are the proverbial hammer for those who insist on seeing a nail in even the most beautiful screw.

The way in which Turbo Drive, Turbo Frames, and Turbo Streams introduce dynamics into a frontend is as powerful as it is thoughtful. With extremely little code, you can create application behavior that would otherwise only be possible with a lot of Javascript. With just a few tweaks, a standard scaffold for a resource becomes a real SPA.

Seeing is believing. Alexandre Ruban's [Turbo Tutorial](https://www.hotrails.dev/) can be worked through in a few hours, and the [final application](https://www.hotrails.dev/quotes) is just as dynamic as a React App, for instance. Astonishingly, the entire example operates with just one line of custom Javascript.

When comparing today's newer, Javascript-based frameworks and their approaches to Rails, it becomes clear: Apart from the different development paradigms (component-driven vs. MVC), they actually only marginally differ in what they can achieve for the user. SPAs play to their strengths where web applications should act like native applications – their actual use case. Rails doesn’t aim to score on this playing field, but the spectrum of dynamic web applications from just below a native application down to purely static websites is large enough to play in.

In all other aspects, Rails differs significantly. Configuration efforts, complexity, dependency management, maintenance, readability, security – with a Rails application, you are offered solutions for all these challenges out of the box without the need to constantly reinvent the wheel.

Considering that Rails is being developed at a high speed both now and in the future, and real – sometimes controversial – innovations are being incorporated into the framework, one can expect that Rails applications will also represent the technological forefront of what is technically possible with SSR technologies in 2023 and beyond. Propshaft, Turbo 8, Strada, Solid Cache, Solid Queue, Mission Control, and Kamal are all exciting developments that will significantly expand the capabilities of the framework in the next version.

# Organizational Efficiency

The recently concluded Rails World 2023 has clearly shown: The interest in Rails – especially among experienced developers and teams – remains unbroken. Not only the number of participants but also the rapid sell-out of the tickets and the excellent [Talks](https://www.youtube.com/watch?v=9RZVdXyzwCw&list=PLHFP2OPUpCeY9IX3Ht727dwu5ZJ2BBbZP) prove that the community around Rails and Ruby is not just alive – it is evolving and thriving.

{{< figure src="/images/rails_world_2023.jpg" alt="Rails World 2023 - Amsterdam" title="Imagesource: https://youtu.be/9RZVdXyzwCw" >}}

Many programmers who focus on Javascript-based technologies today grew up with Rails. Activating them and motivating them for Rails-based projects is easier today than ever before. The technology decision for a new project of course always has many aspects, and the availability of talent is definitely one of the killer factors. However, the continued great popularity of Rails should not let that become a problem. On the contrary – from personal conversations with former colleagues and friends, I gathered that the majority of those who have a significant Rails background would very much like to work with the technology again today. Keyword: Developer Happiness.

When team building is considered a solvable problem, only the almost mantra-like repeated prejudices against Rails remain:

{{< figure src="/images/rikki_kramp.jpg" alt="But we can't..." title="Imagesource: Shamelessly stolen from Chris Oliver" >}}

Supposedly poor performance, poor scalability, too much magic, too steep a learning curve, the disadvantages of a monolith – if you look at all these topics seriously in detail, you realize that there are no real arguments against using Rails. Instead, you find theoretical squabbles in which it is more about the ego of the participants than about technology. If you conduct a realistic assessment and project this onto your own expectations regarding targeted user numbers and traffic, it becomes clear that any remaining counterarguments are rather _luxury problems_ that as the operator of a digital solution you would very much like to have. And there are solutions to these problems.

But in later posts on the topic, I want to shed some light on all these _issues_.

# Conclusion

Ignoring Rails for a greenfield project in 2023 can be costly. If you've assembled a team of developers who really know how to utilize the basics and the innovative parts of the framework, you'll have not just a cost advantage but also a real market edge. In addition to a shorter time-to-market, Rails applications can be operated extremely effectively and efficiently with the right strategy (_and possibly a cloud exit_).

Ultimately, before making a technology decision, one should ask whether they want to produce the proverbial screw or a nail, and whether the toolbox might contain a screwdriver in addition to the hammer.

Retrospectively – but also subjectively – we have thrown SPA technology at just about every problem that even remotely looked somehow like a fit for the web in the last 10 years. Actual added value for the user is often questionable. Direct impact on revenue and profit just as dubious. Costs... sometimes many times higher in comparison because the game with _Latest-Greatest_ was put above the actual goal. Namely: to build a ruthlessly good product that users love and are willing to throw colorful banknotes at.

\[Follow this series with [Part II - Rails does not scale](/posts/rails-does-not-scale).\]
