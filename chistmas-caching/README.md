Caching Patterns
===

This sub-repo is divided into folders, one per episode:

- [`reading`](./reading)

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
