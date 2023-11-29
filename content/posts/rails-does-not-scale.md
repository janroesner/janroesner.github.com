---
title: "Rails Does Not Scale"
date: 2023-11-28T10:00:00+02:00
draft: false
tags: ["rails", "ruby"]
categories: ["rails", "development", "strategy"]
---

\[Read the first part of the series: [Part I – Rails in 2023?](/posts/rails-in-2023)\]

{{< figure src="/images/rails_does_not_scale.png" alt="Rails does not scale!">}}

This phrase or something similar encapsulates most discussions about the potential use of Rails. Over the years it has become a meme, and it would be funny if it weren't simultaneously so sad. There's often a lack of depth when dealing with performance relates topics like this, and too quickly we are satisfied with heard or often-repeated arguments. Guilty as charged.

So, where does it come from? First, it's important to realize that _Rails does not scale_ can actually mean two different things. On one hand, the supposed insufficient performance of Ruby itself. On the other, the apparently lacking ability to scale a non-performant web application.

Let's stay at the same altitude as the _Rails-does-not-scale critics_ and counter with the following arguments:

GitHub, Shopify, AirBnB, Basecamp, Twitch, Square, Zendesk, Cookpad, Stripe, Soundcloud, Kickstarter, Groupon, Bloomberg, Hulu, Goodreads, Fiverr, Dribbble, Scribd… shall I go on?

Discussion over. Because for all these high-traffic apps, neither the performance nor the scalability of Ruby/Rails seems to be a problem. That's it for this article, in the next one we will address the topic… wait. Of course not. I would really like to understand the critics and their arguments, classify and evaluate them, to see where Rails as a modern framework truly stands in terms of performance and scalability.

## Performance

What better way to approach this than to conduct a performance test? This should quickly highlight any problems. Let’s implement a CPU-bound problem in Ruby, Python, and Node.js and measure the respective execution times.

A suitable problem is the **Sieve of Eratosthenes** for determining prime numbers. This problem is not I/O bound and should give us an approximate comparison of computational power per unit of time. To prevent the startup process of the runtimes from becoming too large a source of error, we calculate all prime numbers among the first 5 million natural numbers and then repeat this process 20 times without restarting the runtime.

For those who want to try this themselves, my implementations for Node.js, Python, and Ruby can be found [here](https://github.com/janroesner/perftest).

The result is indeed dramatic! Ruby 3.2.2 versus Python 3.10.9 versus Node 20.9.0 – and the winner is: Node.js.

{{< figure src="/images/interpreter_performance.png" alt="Interpreter Performance">}}

And it is by a _significant_ margin. Python operates at just about 20% of Node's performance. And Ruby, at barely 12%, is the clear loser. The picture changes somewhat with the upcoming YJIT Just-in-Time Compiler in Ruby 3.3.0, but perhaps the Python dependent AI community should consider switching to Node, and maybe we should too.

But let's take our test a step further and implement the prime number calculator in Rust as well. Oops.

{{< figure src="/images/compiler_performance.png" alt="Compiler Performance">}}

Node only provides 13% of Rust's performance. Python, at 2.7%, is more in the snail's pace category, and Ruby, with 1.6%, doesn't even make it to the podium. All our interpreted languages are relatively close together, but they are also far behind. So why aren't we all developing web applications exclusively with Rust for years now?

Especially when there are fantastic web frameworks for the compiler language, like [Rocket](https://rocket.rs/), and plenty of support libraries available?

Because: _It.Doesn't.Matter._

The time consumed between an HTTP request and the response is distributed onto a whole series of sub-processes in a long chain – of course depending on the application. There's the network latency of the request first: DNS resolution, contacting the server. Then come fine details like load balancing, service discovery, execution of Rack modules, SSL/TLS termination, HTTP(2) termination… and all this before even a single line of application specific source code is executed. This of course also requires CPU time, but most applications spend the majority of their time waiting for I/O operations, particularly database access and filesystem transfers.

This is followed by other operations like triggering asynchronous jobs, sending messages in message queues, cache queries, and all the pretty, colorful things that modern web applications must do today to provide users with a satisfactory experience.

The reality is that compute – the time spent executing application and framework code – is not the limiting factor of an SSR (Server-Side Rendered) application. In most cases, it is the access to the database. And to mitigate this, we have a very special technology at our disposal: _Caching_.

In addition to page caching, action caching, and fragment caching in Rails, techniques like Russian Doll Caching, Low-Level Caching, and SQL Caching can significantly speed up an application, as –depending on the chosen caching mechanism – very little to no application or framework code needs to be executed.

Operating a modern web application for thousands, tens of thousands, or more users without caching is economically irresponsible – regardless of which SSR technology is employed on the servers. Considering that caching, in any form, can and must be the foundation of every high-performance web application, it becomes clear that the performance differences between the various interpreted languages in real-world applications are so minor that they are practically negligible.

## Scalability

_Rails does not scale._

Apart from the performance of Ruby and Rails, it is often argued that Rails monoliths are not scalable.

The origin of such claims is usually unclear. Similarly, those who repetitively chant these and similar statements cannot be convinced with examples to the contrary. The recent Black Week has provided an impressive case with Shopify, demonstrating that Rails can handle hundreds of billions of requests and equally billions of dollars in sales in just a few hours, all without any black magic.

{{< figure src="/images/shopify.png" alt="Shopify Scaling" width="500">}}

This raises the question: what could possibly be the basis for the alleged poor scalability?

The majority of modern applications are deployed in containers today. Docker, Podman, CRI-O, LXC/LXD, and rkt almost all offer the ability to build multi-stage images from a monorepo, each representing different services of a platform. Keyword: Service-oriented architecture.

Automated builds and deployments are the norm in almost every company today, and thanks to modern CI/CD pipelines, developers and DevOps engineers do not have to manually handle the deployment of artifacts into various production and pre-production environments.

The necessary container schedulers are so mature today that they can automatically horizontally scale a service depending on its current load. It almost doesn't matter whether Kubernetes, Mesos, Nomad, Docker Swarm, or one of the cloud offerings from the major providers is used – if the load for a service increases, additional containers are started; if the load decreases, excess containers are shut down again.

This approach works for Rails-based applications in _exactly_ the same way as it does for other languages and frameworks.

A valid point of criticism here is the comparatively higher memory usage of a Ruby/Rails application. Although the situation has steadily improved with newer versions of Ruby, Ruby-based applications do consume more memory in comparison. The reasons for this are manifold: The Ruby object model, which enables metaprogramming and the resulting dynamics, garbage collection, OOP design, framework overhead, dependencies, and eager loading all contribute to the memory consumption of a Ruby application.

However: On one hand, all these challenges can be addressed with appropriate measures during development. And on the other hand, the same applies as with performance. The best code is the code that is not executed – caching is our friend.

## Caching

Building a modern SSR application without a valid caching strategy is like equipping a Formula 1 car with a square cardboard body and expecting it to break records.

{{< figure src="/images/formula_cardboard.png" alt="Formula Cardboard">}}

Caching and, in particular, cache invalidation can be a challenging problem depending on the use case. However, Rails makes it relatively easy for developers with a variety of caching facilities to effectively save processor cycles per request. And the previously significant – especially RAM-driven – costs of cache instances are now countered by [Solid Cache](https://dev.37signals.com/solid-cache/). Database-based caching is much cheaper and allows for caching far more pages, actions, and fragments than RAM-based solutions would permit at the same costs.

So, does Rails scale?

Solid counterarguments that withstand closer scrutiny are hard to find. Experienced software architects and developers understand that choosing a language and framework for an SSR application is more a decision influenced by the availability of talent, ease of use, and other soft criteria rather than concerns regarding performance and scalability.

However, when faced with such a discussion, you should ask yourself whether you are in the right room or have chosen the right battle.

## Conclusion

Rails not only scales better than ever, but it also scales like any other framework that – being based on an interpreted language – is necessarily executed at least an order of magnitude slower than it theoretically would be with a compiled language.

The differences in language performance and memory consumption already play a minor role in real request/response scenarios, but they are almost completely negligible under the application of a proper caching strategy. And the container-based, horizontal scalability of Rails applications and their services is as much a given as the acceptance of SaaS products by end-users.

Rails does scale. Matter of fact.
