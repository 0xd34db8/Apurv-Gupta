---
title: "The Phantom Release: Git Archaeology and Debugging x360ce"
description: "How a mix of Python executable analysis and Git history traversal uncovered a non-existent version in a popular open-source repository."
date: "September 17, 2026"
tags: ["Git", "Python", "Debugging", "Open Source"]
---

# Debugging an Open Source Mystery: The Case of the Phantom Version Tag

If you spend enough time contributing to open-source software, you'll eventually stumble upon a bug that isn't really a bug in the code, but a ghost in the repository's history. I recently encountered exactly this while looking to contribute to [x360ce](https://github.com/x360ce/x360ce), the popular Xbox 360 Controller Emulator.

What started as a seemingly standard bug report turned into a fascinating dive into Git archaeology, reverse engineering executable metadata, and piecing together a timeline from years ago. Here is how I tracked down and resolved Issue #1522.

## The Problem: The Re-Release That Wasn't

I was browsing the x360ce repository looking for a good starting point and found **Issue #1522**. A user reported a frustrating problem: they were experiencing crashes on Windows 11 with versions `3.2.10` and above. The maintainers had thoughtfully provided a "Re-Release of old version" tagged as `3.2.9.82` to help users bypass the crash.

However, users noticed that when they downloaded the `3.2.9.82` zip file, the program still reported itself as `3.2.10.82`—the exact version they were trying to avoid!

My initial thought was that this might be a CI/CD pipeline caching issue or a hardcoded string in the legacy C# UI.

## Step 1: Trust, but Verify (with Python)

Before diving into the source code, I needed to confirm exactly what the users were downloading. I downloaded the `x86` zip file from the `3.2.9.82` release page and wrote a quick Python script using the `pefile` library to inspect the PE (Portable Executable) metadata of the `.exe`:

```python
import pefile

pe = pefile.PE("x360ce_x86.exe")
for file_info in pe.FileInfo[0]:
    if file_info.Key.decode() == "StringFileInfo":
        for st in file_info.StringTable:
            for key, value in st.entries.items():
                print(f"{key.decode()}: {value.decode()}")
```

The output was undeniable:

- `FileVersion: 3.2.10.82`
- `ProductVersion: 3.2.10.82`
- `Assembly Version: 3.2.10.82`

The binary inside the `3.2.9.82` release was undeniably built from `3.2.10.82` source code.

## Step 2: Git Archaeology

Next, I needed to find out _why_ the automated build (or manual upload) grabbed the wrong version. I cloned the repository and started digging into the Git history to find the true source code for `3.2.9.82`.

First, I checked what commit the `3.2.9.82` tag was pointing to:

```bash
git rev-list -n 1 3.2.9.82
```

This pointed me to commit `39ce4cd3`. But when I inspected the `AssemblyInfo.cs` file at that exact commit:

```bash
git show 3.2.9.82:x360ce.App/Properties/AssemblyInfo.cs
```

The file clearly read `[assembly: AssemblyVersion("3.2.10.82")]`. The tag itself was placed on the wrong codebase!

So, where was the _real_ `3.2.9.82`? I decided to search the entire repository history across all branches for any modification of the `AssemblyInfo.cs` file that included that version number:

```bash
git log --all --oneline -S "3.2.10.82" -- "**/AssemblyInfo.cs"
```

This led me to commit `cca9b089`, explicitly labeled `v3.2.10.82 (2015-10-20)`.

I then checked the commit immediately preceding it (`cca9b089~1`), which was commit `da5b2601`. When I checked the `AssemblyInfo.cs` file for _that_ commit, I found my plot twist:

```csharp
[assembly: AssemblyVersion("3.2.8.77")]
```

**The project's versioning jumped directly from `3.2.8.77` to `3.2.10.82`. Version `3.2.9.82` never actually existed in the source code!**

When the maintainer attempted to create the "Re-Release", they mistakenly named it `3.2.9.82`. Because that version didn't exist in the commit tree, the tag was accidentally placed on the `3.2.10.82` codebase, defeating the entire purpose of the legacy release.

## Step 3: The Fix

Fixing this required a two-pronged approach, due to a quirk in how GitHub works: Pull Requests cannot modify GitHub Releases or replace attached `.zip` files.

1.  **The Code/Docs PR:** I created a new branch and searched the repository for mentions of the phantom `3.2.9.82` version. I updated the `README.md` to point to the actual last-known-good legacy version, `3.2.8.77`, and opened PR #1632.
2.  **The Release Instructions:** I documented all of my Git findings directly on Issue #1522. I provided the maintainers with the exact commit SHA (`da5b2601`) that represents the true pre-crash codebase, instructing them to rename the release to `3.2.8.77` and recompile the `.zip` assets from that specific commit.

## Takeaways

Not every bug requires deep C++ debugging or rewriting core logic. Sometimes, the most valuable contribution you can make to an open-source project is untangling its history. By combining a bit of Python scripting with advanced Git commands, I was able to solve a confusing issue that was keeping Windows 11 users from enjoying their games.

Always verify your assumptions, and don't be afraid to dig deep into `git log`!
