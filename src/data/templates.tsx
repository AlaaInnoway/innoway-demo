const templates = [
    {
        id: 1,
        title: "Project Management",
        category: {
          id: "PLANNING",
          name: "Planning",
          color: "blue",
        },
        src: "https://mokkupai.s3.ap-south-1.amazonaws.com/files/assets/template/pages/176.png?rels=h0mwg1dqylw",
        used: 5,
        data: [
            {
                "id": 10,
                "sequence": 1,
                "modelName": 'Employee',
                "type": "tile",
                "title": "Open Tasks",
                "paletteColor": "orange",
                "isBookmarked": false,
                "aggregationOptions": "average",
                "measureField": "id",
                "isClickable": true,
                "data": 4,
                "icon": "document"
            },
            {
                "id": 9,
                "sequence": 2,
                "modelName": 'Employee',
                "type": "tile",
                "title": "Done Taks",
                "paletteColor": "green",
                "isBookmarked": false,
                "aggregationOptions": "sum",
                "measureField": "id",
                "isClickable": true,
                "data": 17,
                "icon": "document"
            },
            {
                "id": 8,
                "sequence": 3,
                "modelName": 'Employee',
                "type": "tile",
                "title": "Overdue Tasks",
                "paletteColor": "pink",
                "isBookmarked": false,
                "aggregationOptions": "average",
                "measureField": "id",
                "isClickable": false,
                "data": 3,
                "icon": "folders"
            },
            {
                "id": 7,
                "sequence": 4,
                "modelName": 'Employee',
                "type": "tile",
                "title": "Contributors",
                "paletteColor": "blue",
                "isBookmarked": false,
                "aggregationOptions": "sum",
                "measureField": "id",
                "isClickable": false,
                "data": 37,
                "icon": "user"
            },
            {
                "id": 3,
                "sequence": 5,
                "modelName": 'Employee',
                "type": "bar",
                "title": "Employees grouped by Status",
                "paletteColor": "purple",
                "isBookmarked": false,
                "aggregationOptions": "count",
                "groupByField": 'status',
                "measureField": "id",
                "isClickable": false,
                "data": {
                    "ACTIVE": {
                        "records": [
                            {
                                "id": 1,
                                "status": "ACTIVE"
                            },
                            {
                                "id": 6,
                                "status": "ACTIVE"
                            },
                            {
                                "id": 9,
                                "status": "ACTIVE"
                            },
                            {
                                "id": 10,
                                "status": "ACTIVE"
                            },
                            {
                                "id": 11,
                                "status": "ACTIVE"
                            },
                            {
                                "id": 12,
                                "status": "ACTIVE"
                            },
                            {
                                "id": 13,
                                "status": "ACTIVE"
                            },
                            {
                                "id": 14,
                                "status": "ACTIVE"
                            }
                        ],
                        "aggregations": {
                            "count_id": 8
                        }
                    },
                    "ON_LEAVE": {
                        "records": [
                            {
                                "id": 3,
                                "status": "ON_LEAVE"
                            },
                            {
                                "id": 5,
                                "status": "ON_LEAVE"
                            },
                            {
                                "id": 7,
                                "status": "ON_LEAVE"
                            }
                        ],
                        "aggregations": {
                            "count_id": 3
                        }
                    },
                    "TERMINATED": {
                        "records": [
                            {
                                "id": 4,
                                "status": "TERMINATED"
                            }
                        ],
                        "aggregations": {
                            "count_id": 1
                        }
                    }
                },
                "icon": ""
            },
            {
                "id": 1,
                "sequence": 6,
                "modelName": 'Employee',
                "type": "pie",
                "title": "Employees grouped by Department",
                "paletteColor": "blue",
                "isBookmarked": false,
                "aggregationOptions": "count",
                "groupByField": 'department.name',
                "measureField": "id",
                "isClickable": false,
                "data": {
                    "Sales": {
                        "records": [
                            {
                                "id": 12,
                                "department": {
                                    "name": "Sales"
                                }
                            }
                        ],
                        "aggregations": {
                            "count_id": 1
                        }
                    },
                    "Finance": {
                        "records": [
                            {
                                "id": 1,
                                "department": {
                                    "name": "Finance"
                                }
                            },
                            {
                                "id": 4,
                                "department": {
                                    "name": "Finance"
                                }
                            },
                            {
                                "id": 5,
                                "department": {
                                    "name": "Finance"
                                }
                            },
                            {
                                "id": 6,
                                "department": {
                                    "name": "Finance"
                                }
                            },
                            {
                                "id": 14,
                                "department": {
                                    "name": "Finance"
                                }
                            }
                        ],
                        "aggregations": {
                            "count_id": 5
                        }
                    },
                    "Human Resources": {
                        "records": [
                            {
                                "id": 7,
                                "department": {
                                    "name": "Human Resources"
                                }
                            },
                            {
                                "id": 11,
                                "department": {
                                    "name": "Human Resources"
                                }
                            }
                        ],
                        "aggregations": {
                            "count_id": 2
                        }
                    },
                    "Information Technology": {
                        "records": [
                            {
                                "id": 3,
                                "department": {
                                    "name": "Information Technology"
                                }
                            },
                            {
                                "id": 9,
                                "department": {
                                    "name": "Information Technology"
                                }
                            },
                            {
                                "id": 10,
                                "department": {
                                    "name": "Information Technology"
                                }
                            },
                            {
                                "id": 13,
                                "department": {
                                    "name": "Information Technology"
                                }
                            }
                        ],
                        "aggregations": {
                            "count_id": 4
                        }
                    }
                },
                "icon": ""
            }
        ]
    },
    {
        id: 2,
        title: "HR Performance Management",
        category: {
          id: "HR",
          name: "Human Resources",
          color: "purple",
        },
        src:"https://mokkupai.s3.ap-south-1.amazonaws.com/files/assets/template/pages/14.png?rels=fwph6x9mj9n",
        used: 1,
        data: [
            {
                "id": 10,
                "sequence": 1,
                "modelName": 'Employee',
                "type": "tile",
                "title": "Open Positions",
                "paletteColor": "blue",
                "isBookmarked": false,
                "aggregationOptions": "average",
                "measureField": "id",
                "isClickable": true,
                "data": 8,
                "icon": "document"
            },
            {
                "id": 9,
                "sequence": 2,
                "modelName": 'Employee',
                "type": "tile",
                "title": "Documents",
                "paletteColor": "green",
                "isBookmarked": false,
                "aggregationOptions": "sum",
                "measureField": "id",
                "isClickable": true,
                "data": 60,
                "icon": "document"
            },
            {
                "id": 8,
                "sequence": 3,
                "modelName": 'Employee',
                "type": "tile",
                "title": "Department",
                "paletteColor": "pink",
                "isBookmarked": false,
                "aggregationOptions": "average",
                "measureField": "id",
                "isClickable": false,
                "data": 12,
                "icon": "folders"
            },
            {
                "id": 7,
                "sequence": 4,
                "modelName": 'Employee',
                "type": "tile",
                "title": "Employees",
                "paletteColor": "orange",
                "isBookmarked": false,
                "aggregationOptions": "sum",
                "measureField": "id",
                "isClickable": false,
                "data": 95,
                "icon": "user"
            },
            {
                "id": 3,
                "sequence": 5,
                "modelName": 'Employee',
                "type": "bar",
                "title": "Employees grouped by Status",
                "paletteColor": "purple",
                "isBookmarked": false,
                "aggregationOptions": "count",
                "groupByField": 'status',
                "measureField": "id",
                "isClickable": false,
                "data": {
                    "ACTIVE": {
                        "records": [
                            {
                                "id": 1,
                                "status": "ACTIVE"
                            },
                            {
                                "id": 6,
                                "status": "ACTIVE"
                            },
                            {
                                "id": 9,
                                "status": "ACTIVE"
                            },
                            {
                                "id": 10,
                                "status": "ACTIVE"
                            },
                            {
                                "id": 11,
                                "status": "ACTIVE"
                            },
                            {
                                "id": 12,
                                "status": "ACTIVE"
                            },
                            {
                                "id": 13,
                                "status": "ACTIVE"
                            },
                            {
                                "id": 14,
                                "status": "ACTIVE"
                            }
                        ],
                        "aggregations": {
                            "count_id": 8
                        }
                    },
                    "ON_LEAVE": {
                        "records": [
                            {
                                "id": 3,
                                "status": "ON_LEAVE"
                            },
                            {
                                "id": 5,
                                "status": "ON_LEAVE"
                            },
                            {
                                "id": 7,
                                "status": "ON_LEAVE"
                            }
                        ],
                        "aggregations": {
                            "count_id": 3
                        }
                    },
                    "TERMINATED": {
                        "records": [
                            {
                                "id": 4,
                                "status": "TERMINATED"
                            }
                        ],
                        "aggregations": {
                            "count_id": 1
                        }
                    }
                },
                "icon": ""
            },
            {
                "id": 1,
                "sequence": 6,
                "modelName": 'Employee',
                "type": "pie",
                "title": "Employees grouped by Department",
                "paletteColor": "blue",
                "isBookmarked": false,
                "aggregationOptions": "count",
                "groupByField": 'department.name',
                "measureField": "id",
                "isClickable": false,
                "data": {
                    "Sales": {
                        "records": [
                            {
                                "id": 12,
                                "department": {
                                    "name": "Sales"
                                }
                            }
                        ],
                        "aggregations": {
                            "count_id": 1
                        }
                    },
                    "Finance": {
                        "records": [
                            {
                                "id": 1,
                                "department": {
                                    "name": "Finance"
                                }
                            },
                            {
                                "id": 4,
                                "department": {
                                    "name": "Finance"
                                }
                            },
                            {
                                "id": 5,
                                "department": {
                                    "name": "Finance"
                                }
                            },
                            {
                                "id": 6,
                                "department": {
                                    "name": "Finance"
                                }
                            },
                            {
                                "id": 14,
                                "department": {
                                    "name": "Finance"
                                }
                            }
                        ],
                        "aggregations": {
                            "count_id": 5
                        }
                    },
                    "Human Resources": {
                        "records": [
                            {
                                "id": 7,
                                "department": {
                                    "name": "Human Resources"
                                }
                            },
                            {
                                "id": 11,
                                "department": {
                                    "name": "Human Resources"
                                }
                            }
                        ],
                        "aggregations": {
                            "count_id": 2
                        }
                    },
                    "Information Technology": {
                        "records": [
                            {
                                "id": 3,
                                "department": {
                                    "name": "Information Technology"
                                }
                            },
                            {
                                "id": 9,
                                "department": {
                                    "name": "Information Technology"
                                }
                            },
                            {
                                "id": 10,
                                "department": {
                                    "name": "Information Technology"
                                }
                            },
                            {
                                "id": 13,
                                "department": {
                                    "name": "Information Technology"
                                }
                            }
                        ],
                        "aggregations": {
                            "count_id": 4
                        }
                    }
                },
                "icon": ""
            }
        ]
    },
    {
      id: 3,
      title: "CRM Dashboard",
      category: {
        id: "CRM",
        name: "CRM",
        color: "orange",
      },
      src:"https://mokkupai.s3.ap-south-1.amazonaws.com/files/assets/template/pages/10.png?rels=57gpvf3abuf",
      used: 3,
    },
    {
      id: 4,
      title: "Sales Dashboard",
      category: {
        id: "SALES",
        name: "Sales",
        color: "green",
      },
      src:"https://mokkupai.s3.ap-south-1.amazonaws.com/files/assets/template/pages/173.png?rels=xus9h15mjd",
      used: 4,
    },
    {
      id: 5,
      title:"Training And Development ",
      category: {
        id: "HR",
        name: "Human Resources",
        color: "purple",
      },
      src: "https://mokkupai.s3.ap-south-1.amazonaws.com/files/assets/template/pages/171.png?rels=18rzy93lbyx",
      used: 8,
    },
    {
      id: 6,
      title: "HR Management Analytics",
      category: {
        id: "HR",
        name: "Human Resources",
        color: "purple",
      },
      src:"https://mokkupai.s3.ap-south-1.amazonaws.com/files/assets/template/pages/204.png?rels=yyzh3fm7rrh",
      used: 0,
    },
    {
      id: 7,
      title: "HR Salary",
      category: {
        id: "HR",
        name: "Human Resources",
        color: "purple",
      },
      src:"https://mokkupai.s3.ap-south-1.amazonaws.com/files/assets/template/pages/44.png?rels=6kl0e82250b",
      used: 12,
    },
    {
      id: 8,
      title: "HR Employee Prediction Report",
      category: {
        id: "HR",
        name: "Human Resources",
        color: "purple",
      },
      src:"https://mokkupai.s3.ap-south-1.amazonaws.com/files/assets/template/pages/197.png?rels=a4r4xnmdpxt",
      used: 7,
    }
]

export default templates;