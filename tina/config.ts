import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD || "main";

export default defineConfig({
  branch: "main", 
  clientId: process.env.TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",

  build: {
    outputFolder: "admin",
    publicFolder: "docs",
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "docs",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "courses",
        label: "Courses",
        path: "src/courses",
        fields: [
          {
            type: "string",
            name: "CourseName",
            label: "Course Name",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "Programs",
            label: "Programs",
            list: true,
          },
          {
            type: "number",
            name: 'DevCycle',
            label: "Development Cycle",
          },
          {
            type: "string",
            name: 'Blueprint',
            label: "Blueprint",
          },
          {
            type: "rich-text",
            name: 'Description',
            label: "Course Description",
          },
          {
            type: "object", 
            label: "Team",
            name: "Team", 
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item.Name }
              },
            },
            fields: [
                  {
                    type: "string",
                    name: 'Name',
                    label: "Name",
                  }, 
                  {
                    type: "string",
                    name: 'Role',
                    label: "Role",
                    options: ["Course Author", "Learning Designer", "Digital Education Developer"]
                  }, 
                  {
                    type: "string",
                    name: 'Involvement',
                    label: "Involvement",
                    options: ['Lead', 'Collaborator', 'Contributer']
                  }
                ]
          },
          {
          type: "string", 
          label: "Course Learning Outcomes",
          name: "CLOs", 
          list: true,
          },
          {
          type: "string", 
          label: "Topics",
          name: "Topics", 
          list: true,
          },
          {
          type: "object", 
          label: "Assessments",
          name: "Assessments", 
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item.Name }
            },
              },
          fields: [
            {
            type: "string", 
            label: "Name",
            name: "Name", 
            }, 
            {
            type: "number", 
            label: "Weighting",
            name: "Weighting", 
            }, 
            {
            type: "string", 
            label: "Type",
            name: "Type",
            list: true,
            options: [
              "Annotated Bibliography",
              "Assessment Plan",
              "Case Study",
              "Concept Design",
              "Creative Work",
              "Critical Analysis",
              "Data Collection and/or Analysis",
              "Design Project",
              "Discussion",
              "Essay",
              "Interactive Questions",
              "Interview",
              "Learning Journal",
              "Linguistics Exercise",
              "Literature Review",
              "Media Task",
              "Model",
              "Multiple Choice Questions",
              "Oral Defence",
              "Peer Review",
              "Performance",
              "Persuasive Piece",
              "Placement or Workplace-based Assessment",
              "Portfolio",
              "Problem Solving",
              "Professional Simulation",
              "Proposal",
              "Report",
              "Short Response Questions",
              "Skills Demonstration",
              "Thesis"
            ]
            }, 
            {
            type: "string", 
            label: "Description",
            name: "Description", 
            ui: {component: "textarea"},
            }, 
            ]
          }, 
          {
            type: "object", 
            label: "Media",
            name: "Media", 
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item.Name }
              },
                },
            fields: [
              {
              type: "string", 
              label: "Name",
              name: "Name", 
              }, 
              {
              type: "string", 
              ui: {component: "select"},      
              label: "Type",
              name: "Type", 
              options: ['H5P', 'IMG', 'ECHO', 'YOUTUBE', 'IFRAME',]
              }, 
              {
              type: "string", 
              label: "Link",
              name: "Link", 
              }, 
              {
              type: "string", 
              label: "Description",
              name: "Description", 
              ui: {
                component: "textarea"
              }
              },
              {
                type: "string", 
                label: "Location",
                name: "Location", 
                },  
              ]
            },
            {
            type: "object", 
            label: "Snapshot",
            name: "Snapshot", 
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item.Name }
              },
                },
            fields: [
              {
              type: "string", 
              label: "Name",
              name: "Name", 
              }, 
              {
              type: "string", 
              label: "Link",
              name: "Link", 
              }, 
              {
              type: "string", 
              ui:{component: "textarea"},
              label: "Description",
              name: "Description", 
              }, 
              {
              type: "string", 
              label: "Location",
              name: "Location", 
              }, 
              ]
            },
            {
              type: "string", 
              label: "Jobs",
              name: "Jobs", 
              list: true,
              },
          {
            type: "rich-text",
            name: "learningExperience", 
            label: "Learning Experience", 
            isBody: true, 
          },
        ]
      },
    ],
  },
});
