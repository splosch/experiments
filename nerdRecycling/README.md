Container & Processor
===============
Container and processor define 2 basic classes, which instances can build a very simple processing chain.
Processor consumes items from a linked container, and forwards the (processed)items to another linked container.

The processor can receive an algorithm that mainpulates or reacts on consumed items.

What for:
---------------
* Modularized approach to add Roles to Page Items
* Lists can become Containers
  * List Item handling
  * carry, swallow, drop Items
* Buttons can become Processors
  * Attached to Conatiners (IN / OUT / ...)
  * consume, process, handover Container Items
  * Timed processes
