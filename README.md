# Team Earth: QA Cinemas

## Key Links

[Jira Board](https://joolsarts.atlassian.net/jira/software/projects/EAR/boards/4)

## Setting up the project

In order to setup this project, you must make sure to have the latest versions of `node` and `npm` installed. A guide to these can be found [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Once these are installed, run the below command fromt the base directory of the project.

```bash
npm i
```

This will install all relevant dependencies into your project within a newly created `node_modules` folder.

Note: `node_modules/` is part of the `.gitignore` file, and should __not__ be forcibly pushed to the repository.

To now run the project, run any one of the following commands dependaing on your desired environment:

```bash
npm run dev
```

```bash
npm run prod
```