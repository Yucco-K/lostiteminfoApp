# ERD 図

```mermaid
erDiagram
    users ||--o{ posts : creates
    users ||--o{ profiles : has
    posts ||--o{ post_files : contains

    users {
        uuid id PK
        string email
        timestamp created_at
        timestamp updated_at
    }

    profiles {
        uuid id PK
        uuid user_id FK
        string role
        timestamp created_at
        timestamp updated_at
    }

    posts {
        uuid id PK
        uuid created_by FK
        string lostitem_name
        date find_date
        time find_time
        string find_place
        text comment
        text remarks_column
        boolean resolved
        boolean hidden
        timestamp created_at
        timestamp updated_at
    }

    post_files {
        uuid id PK
        uuid post_id FK
        string file_url
        timestamp created_at
        timestamp updated_at
    }
}
```
