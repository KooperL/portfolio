Pressing pause for now.
 TODO:
 - Vector transformation as a method of their class. This will let them keep their colour properties when undergoing a transformation
 - Edge plane clipping for simple raster
 - Try to do something to reduce duplicate code
 - Put engine components behind layers of abstraction to be changed without affecting core engine -> make it a method and take args
 - colour spectrum
 - switch between canvas, web-gl enabled canvas and svg rasterisation

Abandoning, performance is simply not going to be acceptable without spending more time learning optimising strategies. Time better spent implementing algo's with a public library. Shame.
KT to myself:
 - V1 had best performance, but function structure was a mess and wasn't designed to be a general engine
 - V2 Was more well made and class based, not optimal for react but function structure was very ideal. Probably where I should pick up
 - V3 Was V2 crammed into react functional components, eventually started impacting performance.