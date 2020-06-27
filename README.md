# MicroServiceBlog

Simple React Blog to play around with microservice arch.

## Dependencies:

- [Docker Desktop](https://www.docker.com/products/docker-desktop) or [Docker Toolbox](https://docs.docker.com/engine/install/)
- Kubernetes or [MiniKube](https://kubernetes.io/docs/setup/learning-environment/minikube/)
- [Skaffold](skaffold.dev)

## Setup Host Redirection:

After having all dependencies set up we will need to modify our hosts files to allow us to access the app at [posts.com](posts.com)

We will be adding the following line to the bottom of our hosts file

```
127.0.0.1 posts.com
```

### Windows

On windows the hosts file can be found here

```
C:\Windows\System32\Drivers\etc\hosts
```

### MacOS/Linux

On MacOS and Linux the hosts file can be found here

```
/etc/hosts
```

## Running the app

Once we've installed our dependencies and modified out hosts file we can call the skaffold command.

```
skaffold dev
```

#### Note

The skaffold command may hang for a few minutes or raise warnings the first time it is run.

Once the skaffold deployments have been completed, you can access the app at [posts.com](posts.com)
