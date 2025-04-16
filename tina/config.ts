import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "docs",
  },
  media: {
    tina: {
      mediaRoot: "",
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
                  }, 
                  {
                    type: "string",
                    name: 'Involvement',
                    label: "Involvement",
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
            list: true 
            }, 
            {
            type: "string", 
            label: "Description",
            name: "Description", 
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
              component: "select",      
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
              component: "textarea",
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
