---
path: 2020/taste-of-k8s
title: A Taste of Kubernetes
subtitle: An introduction to basic Kubernetes concepts and deploying a basic web server in the cloud.
date: 2020-04-19
---


This guide is intended to give you some initial experience with [Kubernetes](https://kubernetes.io/docs/concepts/) and to help you decide whether you want to pursue further learning in the form of books, courses or practical experience.

First, we'll look at what Kubernetes is, cover the basic concepts, and then use it to deploy a web server in the cloud.

## Expectations

* This guide assumes *some* basic experience with; Docker, web apps, APIs and cloud platforms
* This guide assumes no knowledge of; Kubernetes or container orchestration


## Things you'll need

You'll need a [Google Cloud Platform account](https://cloud.google.com/) if you want to follow along. We'll make use of their [Cloud Shell](https://cloud.google.com/shell) feature to run CLI commands without installing any tools locally.

NOTE; usage of Google Cloud Platform can incur costs. If you only run a cluster for a short period of time, or you're still within the free trial period, the cost will be small (cents) or zero. However, if you forget to tear-down resources afterwards, then those costs can accumulate.

## What problem does Kubernetes solve?

Firstly, let's get an introduction to Kubernetes.

To understand how Kubernetes can help us, we need to briefly revisit what Docker itself does. Docker allows you to build, push and pull Docker images. These images describe the software that you want to run and all of the dependencies. These images can be run in multiple environments and can be shared with others. One of the benefits of this is that you can be confident of a consistent operating environment, no matter where the image is run.

Docker images run in the form of containers. A container is an isolated runtime environment which we can use to run web servers, databases, scripts and pretty much anything. Processes running inside the container do not impact processes outside the container. Conceptually we can consider them as mini virtual machines (VMs), but be aware that on a technical level they are quite different and you don't quite get the same level of isolation on a container that you do from a VM, but good enough for most cases.

This is a very powerful tool to have. Previously we ran applications alongside each other on VMs which had a number of drawbacks; installing dependencies for those applications could potentially come into conflict, it was harder to replicate those environments in a consistent manner, we also had to manage the host itself, ensuring that it is configured correctly and that security updates are up to date.

In the container world, to run our production environment, we could log into our production server and manually type in `docker run sbracegirdle/hellosite`  to start the needed container. But what if the container falls over? What if we need to start more containers to handle more requests as our product grows? What if we need to split our containers across multiple host servers to better make use of our available system resources?

To solve this problem, we need a container orchestration tool. To use an airport analogy; if Docker containers are the flights, then an orchestration tool is the control tower that ensures all the flights are in the right place at the right time. An orchestration tool assists with the complexity of managing the runtime lifecycle of containers. This includes; scaling, deployment, scheduling, networking and distributing containers over multiple hosts (clustering).

Managing containers is a lot of work, which is why recently we've seen a lot of emphasis on container orchestration tools, which are designed to manage this complexity for you. Kubernetes is currently the most popular of those container orchestration tools.

## When to use Kubernetes

This article will try to stray away from the cloud managed services vs container debate, as our primary purpose is to familiarise with Kubernetes as a technology.

However, to provide some high-level direction around technology choices, you may want to consider the following when making a decision:

* Is cloud vendor lock-in a concern for you? Firstly we should evaluate whether this is as big a risk as it seems. There are also ways to mitigate this by using clean architecture. A container-based architecture will give you an additional level of flexibility, but at the potential cost of additional complexity when compared to fully managed services.
* Do you need to support both on-premise and on-cloud? Some legacy environments may still need to support on-premise and a container-based architecture can support both environments.

Kubernetes is quite a large and complex ecosystem with quite an overwhelming amount of concepts to learn. Therefore, it may be overkill for simple cases like this one. However, if you intend to scale out with many services, applications and databases, and you want to maintain maximum flexibility and control of your environment, then it might be a good fit for you.


## How does Kubernetes work?

As mentioned before, Kubernetes is quite a large ecosystem. To keep things simple we'll only introduce two key concepts; [Pods](https://kubernetes.io/docs/concepts/workloads/pods/pod-overview/) and [Controllers](https://kubernetes.io/docs/concepts/architecture/controller/).

### What is a Pod?

[Pods](https://kubernetes.io/docs/concepts/workloads/pods/pod-overview/) are how you run processes in Kubernetes. Do you want to run a database? You run it in a Pod. Do you want to run a re-occurring background job? You run it in a Pod. Without pods we cannot run applications in our environment.

In a more physical sense, a pod is one or more containers that are executed together. However, most commonly, and as general best practice, we run a single container per-Pod. Since we are only just learning Kubernetes, we will stick with this scenario for now.

So we want to run at least one pod to serve our web site. In production we may want at least two to ensure we have a base level of redundancy. Large sites serving thousands of users may run hundreds of containers across different services, data centers and regions.


### What is a Controller?

To continue our airport analogy; from a Kubernetes perspective, a Pod is still just a flight without a control tower. If you create a Pod, and it happens to fail or be terminated, it will not be replaced. If you need to run multiple web servers to handle load, you would need to manually configure each of those Pods. In practice with Kubernetes, you would rarely create Pods directly in production environments.

Therefore, to get the full benefit of using Kubernetes, i.e. to have a control tower at our disposal, we need to make use of the concept of [controllers](https://kubernetes.io/docs/concepts/architecture/controller/).

Controllers help to keep your pods (and other resources) in the expected state. This means they can help us with; deployments, scaling and handling failures to ensure the desired number of pods are running.

Kubernetes comes with a whole variety of different controllers, but the most fundamental one we are interested in is a [Deployment controller](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/).


### What is a deployment?

A deployment is a controller that allows you to specify the desired state of your pods, and it will change the system from the current state to the desired state. In other words, it allows you to deploy changes to pods, as well as scaling up or down the number of replicas of those pods. It does this by working on top of another controller called a [ReplicaSet](https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/).

By default, deployments are done as a [rolling update](https://kubernetes.io/docs/tutorials/kubernetes-basics/update/update-intro/), meaning that pods are replaced with newer versions one by one so that not all pods are out of operation at the same time during a deployment.

Deployments can also be rolled back in case something goes wrong, adding another layer of benefits on top of managing pods manually yourself.

With these concepts at our disposal, we are ready to start creating our first Kubernetes deployment!



## Let's start a cluster

Before we can run our deployment, we need to start a cluster. A cluster is the environment that everything in Kubernetes runs on. Each cluster consists of one or more nodes. A node is a virtual machine (or physical machine) under the management of the cluster.

There are a number of ways to start a cluster. We could run a cluster locally with [minikube](https://kubernetes.io/docs/setup/learning-environment/minikube/), or we could run it in the cloud through [Google Kubernetes Engine](https://cloud.google.com/kubernetes-engine), [AWS Kubernetes Service (EKS)](https://aws.amazon.com/eks/) or [Azure Kubernetes Service](https://azure.microsoft.com/en-au/services/kubernetes-service/).

Of all those options I've personally found the most painless method is running Kubernetes in a managed cloud environment. It does not require us to install any virtualisation software or tools locally and we don't need to deal with the complexity that can come with that.

We should note that this can come at a cost. If we're only running the cluster for a short period of time, the cost will be small (e.g. $0.11 AUD for one-hour usage of a zonal cluster and `n1-standard-1` node instance on Google's Sydney region) or free if it's within your free-tier limits. However, if we forget to tear down resources after, those costs can accumulate very quickly.

Let's now login to the [Google Cloud Console](https://console.cloud.google.com) and open the Cloud Shell function (in the top-right corner):

![image-20200412182404042](/img/kube_001.png)

After a few moments, this will open a shell with the latest version of the `gcloud` CLI tool installed, as well as `kubectl`, the Kubernetes administration tool.

Let's create our cluster by running the following command (we've run this in the `australia-southeast1` region, but you may want to choose one closer to you):

```bash
gcloud container clusters create hello-cluster --machine-type=n1-standard-1 --num-nodes=1 --region=australia-southeast1
```

Let's break this down:

* `gcloud container clusters create` -- This indicates we're going to create a cluster
* `hello-cluster` -- This is the requested name of our cluster
* `--machine-type=n1-standard-1` -- This is the [machine type](https://cloud.google.com/compute/all-pricing#standard_machine_types) (or VM size) that new nodes will use by default
* `--num-nodes=1` -- We will start the cluster with just one node (VM instance) associated with it
* `--region=australia-southeast1` -- I want to run the cluster in Sydney, Australia

For more details on available options, you may want to reference the [SDK documentation](https://cloud.google.com/sdk/gcloud/reference/container/clusters/create).

After a few minutes, the output should look something like the following:

```bash
Creating cluster hello-cluster in australia-southeast1... Cluster is being health-checked (master is healthy)...done.
Created [https://container.googleapis.com/v1/projects/PROJECT_NAME_HERE/zones/australia-southeast1/clusters/hello-cluster].
To inspect the contents of your cluster, go to: https://console.cloud.google.com/kubernetes/workload_/gcloud/australia-southeast1/hello-cluster?project=PROJECT_NAME_HERE
kubeconfig entry generated for hello-cluster.
NAME           LOCATION              MASTER_VERSION  MASTER_IP       MACHINE_TYPE   NODE_VERSION    NUM_NODES  STATUS
hello-cluster  australia-southeast1  1.14.10-gke.27  35.244.109.185  n1-standard-1  1.14.10-gke.27  1          RUNNING
```

This confirms that our cluster is now up and running in the `australia-southeast1` region, and has given us other useful information such as IP addresses and so on.

After the cluster starts, we want to configure `kubectl` to interact with the cluster, so we can issue further commands. This can be done by running:

```bash
gcloud container clusters get-credentials hello-cluster --region=australia-southeast1
```

Let's test it by trying to list all cluster objects:

```bash
kubectl get all
```

This should be empty besides the `ClusterIP` resource as we haven't deployed anything yet:

```bash
NAME                 TYPE        CLUSTER-IP    EXTERNAL-IP   PORT(S)   AGE
service/kubernetes   ClusterIP   10.23.240.1   <none>        443/TCP   3m35s
```

NOTE; The official [kubectl cheatsheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/) is a very useful reference to have on-hand.

## Let's deploy something

Now that we have a cluster, we want to deploy something into it to make it useful. To save time, I've already uploaded an image called `sbracegirdle/hellosite` to Dockerhub. This image serves a very simple website using `httpd` (Apache). The source code for that image is available on my [github page](https://github.com/sbracegirdle/hellosite).

Let's run this command to deploy the image:

```bash
kubectl create deployment hello-static --image=docker.io/sbracegirdle/hellosite:latest
```

If that succeeded, you will see a message along the lines of:

```bash
deployment.apps/hello-static created
```

Let's list deployments to see the status:

```bash
kubectl get deployments
```

It may take a few minutes to run, but this should indicate that our deployment has been executed and we now have a running pod:

```bash
NAME           READY   UP-TO-DATE   AVAILABLE   AGE
hello-static   1/1     1            1           54s
```

We can scale up our deployment with additional pods if necessary:

```bash
kubectl autoscale deployment hello-static --min=2 --max=4
```

NOTE: this may take a minute or so take effect

```bash
kubectl get deployments
```

After completion, it should now indicate that 2 pods are running:

```bash
NAME           READY   UP-TO-DATE   AVAILABLE   AGE
hello-static   2/2     2            2           2m3s
```

We can list the individual pods if we want:

```bash
kubectl get pods
```

Result:

```bash
NAME                            READY   STATUS    RESTARTS   AGE
hello-static-59f8fb7bf7-d9jcc   1/1     Running   0          2m43s
hello-static-59f8fb7bf7-pgzgt   1/1     Running   0          60s
```



## Let's expose the deployment

Our deployment now has running pods, but by default no one outside the cluster can access the services running on those pods. To make them accessible we need to use a [service](https://kubernetes.io/docs/concepts/services-networking/service/). The most common service to use is of type `LoadBalancer`:

```bash
kubectl expose deployment hello-static --type LoadBalancer --port 80 --target-port 80
```

Let's check if the service is up and running:

```bash
kubectl get service
```

Output:

```bash
NAME                   TYPE           CLUSTER-IP     EXTERNAL-IP   PORT(S)        AGE
service/hello-static   LoadBalancer   10.23.250.87   35.189.48.157 80:31665/TCP   30s
service/kubernetes     ClusterIP      10.23.240.1    <none>        443/TCP        9m26s
```

Note the external IP of the `LoadBalancer` above. You should now be able to open that IP address in your browser and you'll see the web page served from the httpd container:

![image-20200414222631533](/img/kube_002.png)

Hooray!

## Inspect the things

Whilst we have a stack up and running, it's worth taking a little look around to familiarise ourselves.

Let's have a look at all Kubernetes resources:


```bash
kubectl get all
```

On my cluster I received the following output, which gives an overview of all pods, services, deployments and so on;

```bash
NAME                                READY   STATUS    RESTARTS   AGE
pod/hello-static-59f8fb7bf7-d9jcc   1/1     Running   0          4m7s
pod/hello-static-59f8fb7bf7-pgzgt   1/1     Running   0          2m24s

NAME                   TYPE           CLUSTER-IP     EXTERNAL-IP   PORT(S)        AGE
service/hello-static   LoadBalancer   10.23.250.87   35.189.48.157 80:31665/TCP   30s
service/kubernetes     ClusterIP      10.23.240.1    <none>        443/TCP        9m26s

NAME                           READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/hello-static   2/2     2            2           4m9s

NAME                                      DESIRED   CURRENT   READY   AGE
replicaset.apps/hello-static-59f8fb7bf7   2         2         2       4m9s

NAME                                               REFERENCE                 TARGETS   MINPODS   MAXPODS   REPLICAS   AGE
horizontalpodautoscaler.autoscaling/hello-static   Deployment/hello-static   1%/80%    2         4         2          2m41s
```

You can view the logs of a particular pod by running the below (where `pod/hello-static-59f8fb7bf7-d9jcc` was my pod ID from the previous command):

```bash
kubectl logs pod/hello-static-59f8fb7bf7-d9jcc
```

Output:

```bash
AH00558: httpd: Could not reliably determine the server's fully qualified domain name, using 10.20.2.4. Set the 'ServerName' directive globally to suppress this message
AH00558: httpd: Could not reliably determine the server's fully qualified domain name, using 10.20.2.4. Set the 'ServerName' directive globally to suppress this message
[Tue Apr 14 14:16:15.160383 2020] [mpm_event:notice] [pid 1:tid 140694791537792] AH00489: Apache/2.4.41 (Unix) configured -- resuming normal operations
[Tue Apr 14 14:16:15.160593 2020] [core:notice] [pid 1:tid 140694791537792] AH00094: Command line: 'httpd -D FOREGROUND'
10.152.0.4 - - [14/Apr/2020:14:25:04 +0000] "GET /tailwind.min.css HTTP/1.1" 200 710997
```

We can take a look at some basic container stats for our pods:

```bash
kubectl top pod hello-static-59f8fb7bf7-d9jcc --containers
```

Output:

```bash
POD                             NAME        CPU(cores)   MEMORY(bytes)
hello-static-59f8fb7bf7-d9jcc   hellosite   1m           5Mi
```


## Tear-down

It's always good practice to tear down cloud resources when we're not using them, firstly to save on costs, but also to reduce waste.

```bash
kubectl delete service hello-static
```

Then we can delete the whole cluster:

```bash
gcloud container clusters delete hello-cluster --region=australia-southeast1
```

Press `Y` to confirm when prompted.

```bash
The following clusters will be deleted.
 - [hello-cluster] in [australia-southeast1]

Do you want to continue (Y/n)?  Y

Deleting cluster hello-cluster...done.
Deleted [https://container.googleapis.com/v1/projects/YOUR_PROJECT_HERE/zones/australia-southeast1/clusters/hello-cluster].
```



## Summary

We have only just scraped the surface of what Kubernetes can do here, but hopefully it served as a good basic introduction to the technology and it's capabilities.

A lot of what we did here was what we call "ClickOps", an approach where we create resources manually via the web console or CLI. This is great for learning, but in the real world we would encourage an infrastructure as code approach. For example; using YML config files for Kubernetes resources and Terraform for creating the GCP resources.

We also didn't cover; volumes, logging, service discovery, labelling and monitoring, so if Kubernetes is a topic that interests you then I would encourage you to pursue further learning in those areas.

Thanks for reading! Please let me know if there's anything I can start doing, stop doing or continue doing in further articles.
