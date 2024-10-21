const jsonData = `
{
  "boards": [
    {
      "name": "Manage Program / Segment",
      "columns": [
        {
          "name": "Siyensikat",
          "color": "#49C4E5",
          "tasks": [
            {
              "id": "taskid-1",
              "title": "Drafting of Production Outline",
              "description": "Prepare an initial outline for the production process.",
              "status": "Ongoing",
              "staffAssigned": "John Doe",
              "subtasks": [
                {
                  "id": "taskid-1-1",
                  "title": "Research topics",
                  "isCompleted": false
                },
                {
                  "id": "taskid-1-2",
                  "title": "Draft key points",
                  "isCompleted": false
                },
                {
                  "id": "taskid-1-3",
                  "title": "Finalize outline",
                  "isCompleted": false
                }
              ]
            },
            {
              "id": "taskid-2",
              "title": "Script Writing",
              "description": "Develop the script for the upcoming episode.",
              "status": "Ongoing",
              "staffAssigned": "Jane Smith",
              "subtasks": [
                {
                  "id": "taskid-2-1",
                  "title": "Outline script flow",
                  "isCompleted": false
                },
                {
                  "id": "taskid-2-2",
                  "title": "Write dialogues",
                  "isCompleted": false
                },
                {
                  "id": "taskid-2-3",
                  "title": "Finalize script",
                  "isCompleted": false
                }
              ]
            }
          ],
          "id": "boardid-1-col-1"
        },
        {
          "name": "ExperTalk",
          "color": "#8471F2",
          "tasks": [
            {
              "id": "taskid-3",
              "title": "Topic Approval",
              "description": "Get approval for the topic to be featured in the episode.",
              "status": "Ongoing",
              "staffAssigned": "Alex Johnson",
              "subtasks": [
                {
                  "id": "taskid-3-1",
                  "title": "Submit proposal",
                  "isCompleted": true
                },
                {
                  "id": "taskid-3-2",
                  "title": "Meeting with stakeholders",
                  "isCompleted": false
                },
                {
                  "id": "taskid-3-3",
                  "title": "Revise and finalize topic",
                  "isCompleted": false
                }
              ]
            }
          ],
          "id": "boardid-1-col-2"
        },
        {
          "name": "NegoSiyensiya",
          "color": "#67E2AE",
          "tasks": [
            {
              "id": "taskid-4",
              "title": "Drafting of Production Outline",
              "description": "Create a detailed production outline for the NegoSiyensiya episode.",
              "status": "Ongoing",
              "staffAssigned": "Chris Lee",
              "subtasks": [
                {
                  "id": "taskid-4-1",
                  "title": "Research business topics",
                  "isCompleted": false
                },
                {
                  "id": "taskid-4-2",
                  "title": "Draft episode structure",
                  "isCompleted": false
                },
                {
                  "id": "taskid-4-3",
                  "title": "Finalize the outline",
                  "isCompleted": false
                }
              ]
            }
          ],
          "id": "boardid-1-col-3"
        },
        {
          "name": "Bantay Bulkan",
          "color": "#49C4E5",
          "tasks": [
            {
              "id": "taskid-5",
              "title": "Script Writing",
              "description": "Develop the script for the Bantay Bulkan episode.",
              "status": "Ongoing",
              "staffAssigned": "Maria Rivera",
              "subtasks": [
                {
                  "id": "taskid-5-1",
                  "title": "Research volcano activity",
                  "isCompleted": false
                },
                {
                  "id": "taskid-5-2",
                  "title": "Draft script structure",
                  "isCompleted": false
                },
                {
                  "id": "taskid-5-3",
                  "title": "Finalize script",
                  "isCompleted": false
                }
              ]
            }
          ],
          "id": "boardid-1-col-4"
        },
        {
          "name": "RapidDOST",
          "color": "#8471F2",
          "tasks": [
            {
              "id": "taskid-6",
              "title": "Drafting of Production Outline",
              "description": "Create an outline for RapidDOST production.",
              "status": "Ongoing",
              "staffAssigned": "David Santos",
              "subtasks": [
                {
                  "id": "taskid-6-1",
                  "title": "Research relevant DOST projects",
                  "isCompleted": false
                },
                {
                  "id": "taskid-6-2",
                  "title": "Outline episode structure",
                  "isCompleted": false
                },
                {
                  "id": "taskid-6-3",
                  "title": "Finalize production outline",
                  "isCompleted": false
                }
              ]
            }
          ],
          "id": "boardid-1-col-5"
        }
      ]
    }
  ]
}
`;

export const db = JSON.parse(jsonData);
