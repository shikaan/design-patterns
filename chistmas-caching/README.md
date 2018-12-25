Caching Patterns
===

This sub-repo is divided into folders, one per episode:

- [`reading`](./reading)
- [`writing`](./writing)

## Reading

In the reading part you can find a simple example of an application fetching 
comics from XKCD.

Since the only changing component between inline cache and cache aside was 
the client, I just added two different clients.

To run the the applications

```
    npm run start:inline
```

```
    npm run start:aside
```

You can launch tests with

```
    npm test
```

## Writing

In the writing part the implementation is done in Python in which we are 
faking long operation using timers.

The easiest way to launch the project is using [`invoke`](http://www.pyinvoke.org/).

```
    invoke init
    invoke install
    invoke start
```

If you want to launch tests you can run

```
    invoke test
```