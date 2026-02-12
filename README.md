# Frontend Take-Home Assignment

## Expectations

**Time Investment**: We recommend spending **no more than one day** on this assignment. We value your time and want to see how you approach problems within a reasonable time frame.

**What We're Looking For**: We care primarily about **functionality and problem-solving approach**, not visual polish. Don't worry about making it look pretty - we want to understand how you:

- Break down a problem
- Structure your code
- Implement a working solution
- Make practical trade-offs

**Keep It Simple**: We're looking for a straightforward, functional solution that demonstrates your thought process and engineering approach. Focus on getting the core features working rather than adding bells and whistles.

**What We Ask From You**:

- **Timeline** - Let us know when you expect to have your submission ready
- **Write-up** - Include a brief explanation of what you built and why you made the technical decisions you did (a few paragraphs in your README works great)

---

## Overview

### The Problem

Security teams need visibility into AI conversations to identify potential risks and policy violations. Currently, there's no way to:

- View conversations happening across the organization
- Identify high-risk prompts and responses (alerts)
- Track which users are generating risky content
- Monitor policy enforcement on AI interactions

### Your Task

Build a web application that allows security teams to:

1. **View Conversations** - Browse all conversations with filtering and pagination
2. **Monitor Alerts** - Identify and highlight high-risk prompts/responses (risk_score ≥ 3)
3. **Track Users** - See which users are generating alerts
4. **Understand Policies** - Show how policies are being applied to block risky content

### Key Features to Implement

- **Conversation List** - Paginated view of all conversations
- **Conversation Detail** - View all prompts and LLM responses for a conversation
- **Alerts Dashboard** - Highlight prompts/responses with risk_score ≥ 3

**Bonus / Nice to Have Features**

- **User Analytics** - Show which users have the most alerts
- **Policy Information** - Display policy names and how they're enforcing safety

---

## Important: API Access Restrictions

**⚠️ This API blocks browser requests.** You cannot call it directly from client-side JavaScript.

### Why?

The API includes `Sec-Fetch-Site`, `Origin`, and `Referer` header checks that block all browser requests. This simulates a real-world scenario where internal APIs should not be publicly accessible.

### Testing API Access

```bash
# ✅ This works (server-side)
curl https://frontend-takehome.fly.dev/api/conversations?limit=5

# ❌ This fails (browser)
fetch('https://frontend-takehome.fly.dev/api/conversations')
# Returns: 403 Forbidden - "This API is not accessible from browsers"
```

---

## API Documentation

### Base URL

```
https://frontend-takehome.fly.dev
```

### Available Endpoints

#### 1. Get Conversations

```
GET /api/conversations
```

**Query Parameters:**

- `page` (number, default: 1) - Page number
- `limit` (number, default: 100, max: 100) - Items per page
- `filter[user_id]` (string, optional) - Filter by user ID

**Example Request:**

```bash
curl "https://frontend-takehome.fly.dev/api/conversations?page=1&limit=10"
```

**Example Response:**

```json
{
  "total": 3564,
  "page": 1,
  "limit": 10,
  "offset": 0,
  "conversations": [
    {
      "id": "uuid",
      "title": "How do I parse a firewall in Python?",
      "user_id": "uuid",
      "created": "2023-01-01T00:00:00.000Z",
      "updated": "2023-01-01T00:00:00.000Z"
    }
  ]
}
```

---

#### 2. Get Single Conversation

```
GET /api/conversations/:id
```

**Example Request:**

```bash
curl "https://frontend-takehome.fly.dev/api/conversations/abc-123"
```

**Example Response:**

```json
{
  "id": "abc-123",
  "title": "Example Conversation",
  "user_id": "user-456",
  "created": "2023-01-01T00:00:00.000Z",
  "updated": "2023-01-01T00:00:00.000Z"
}
```

---

#### 3. Get Prompts

```
GET /api/prompts
```

**Query Parameters:**

- `page` (number, default: 1) - Page number
- `limit` (number, default: 100, max: 100) - Items per page
- `filter[conversation_id]` (string, optional) - Filter by conversation
- `filter[policy_id]` (string, optional) - Filter by policy
- `include` (string, optional) - Include related data: `llm_responses`

**Example Request:**

```bash
# Get prompts with LLM responses
curl "https://frontend-takehome.fly.dev/api/prompts?include=llm_responses&limit=5"

# Get prompts for a specific conversation
curl "https://frontend-takehome.fly.dev/api/prompts?filter[conversation_id]=abc-123"
```

**Example Response (without include):**

```json
{
  "total": 150000,
  "page": 1,
  "limit": 5,
  "offset": 0,
  "prompts": [
    {
      "id": "prompt-1",
      "conversation_id": "conv-1",
      "text": "How do I implement authentication?",
      "risk_score": 0,
      "action": "none",
      "policy_id": "policy-1",
      "created": "2023-01-01T00:00:00.000Z",
      "updated": "2023-01-01T00:00:00.000Z"
    }
  ]
}
```

**Example Response (with include=llm_responses):**

```json
{
  "total": 150000,
  "page": 1,
  "limit": 5,
  "offset": 0,
  "prompts": [
    {
      "id": "prompt-1",
      "conversation_id": "conv-1",
      "text": "How do I implement authentication?",
      "risk_score": 0,
      "action": "none",
      "policy_id": "policy-1",
      "created": "2023-01-01T00:00:00.000Z",
      "updated": "2023-01-01T00:00:00.000Z",
      "llm_responses": [
        {
          "id": "response-1",
          "conversation_id": "conv-1",
          "prompt_id": "prompt-1",
          "completed_at": "2023-01-01T00:00:05.000Z",
          "model": "gpt-4.1-2025-04-14",
          "risk_score": 0,
          "action": "none",
          "policy_id": "policy-1",
          "output": "[{\"type\":\"message\",\"content\":[{\"type\":\"output_text\",\"text\":\"Here's how to implement authentication...\"}]}]",
          "created": "2023-01-01T00:00:05.000Z",
          "updated": "2023-01-01T00:00:05.000Z"
        }
      ]
    }
  ]
}
```

---

#### 4. Get Single Prompt

```
GET /api/prompts/:id
```

**Query Parameters:**

- `include` (string, optional) - Include related data: `llm_responses`

**Example Request:**

```bash
curl "https://frontend-takehome.fly.dev/api/prompts/prompt-1?include=llm_responses"
```

---

#### 5. Get Users

```
GET /api/users
```

**Query Parameters:**

- `page` (number, default: 1) - Page number
- `limit` (number, default: 100, max: 100) - Items per page
- `filter[vip]` (number, optional) - Filter by VIP status (0 = regular, 1 = VIP)

**Example Requests:**

```bash
# Get all users
curl "https://frontend-takehome.fly.dev/api/users?limit=10"

# Get only VIP users
curl "https://frontend-takehome.fly.dev/api/users?filter[vip]=1&limit=10"

# Get only regular users
curl "https://frontend-takehome.fly.dev/api/users?filter[vip]=0&limit=10"
```

**Example Response:**

```json
{
  "total": 100,
  "page": 1,
  "limit": 10,
  "offset": 0,
  "users": [
    {
      "id": "user-1",
      "name": "John Doe",
      "email": "john@example.com",
      "vip": 0,
      "created": "2023-01-01T00:00:00.000Z",
      "updated": "2023-01-01T00:00:00.000Z"
    }
  ]
}
```

---

#### 6. Get Single User

```
GET /api/users/:id
```

**Example Request:**

```bash
curl "https://frontend-takehome.fly.dev/api/users/user-1"
```

---

#### 7. Get Policies

```
GET /api/policies
```

**Query Parameters:**

- `page` (number, default: 1) - Page number
- `limit` (number, default: 100, max: 100) - Items per page

**Example Request:**

```bash
curl "https://frontend-takehome.fly.dev/api/policies"
```

**Example Response:**

```json
{
  "total": 10,
  "page": 1,
  "limit": 100,
  "offset": 0,
  "policies": [
    {
      "id": "policy-1",
      "policy_name": "Global AI Policy",
      "policy_version": 1523,
      "created": "2023-01-01T00:00:00.000Z",
      "updated": "2023-01-01T00:00:00.000Z"
    }
  ]
}
```

---

#### 8. Get Single Policy

```
GET /api/policies/:id
```

**Example Request:**

```bash
curl "https://frontend-takehome.fly.dev/api/policies/policy-1"
```

---

## Understanding the Data Model

### Risk Scores

- **0** = None (no risk)
- **1** = Low risk
- **2** = Medium risk
- **3** = High risk ⚠️ **ALERT**

### Actions

- **"none"** = Allowed by policy
- **"blocked"** = Blocked by policy (content was flagged as risky)

### Alert Definition

An **alert** is any prompt or LLM response with `risk_score >= 3`.

### Policy Enforcement Flow

1. **Prompt Level**: User submits a prompt

   - Policy checks the prompt's risk_score
   - If `risk_score >= 3` → May set `action = "blocked"`
   - Blocked prompts don't get sent to the LLM

2. **Response Level**: LLM generates a response
   - Policy checks the response's risk_score
   - If `risk_score >= 3` → May set `action = "blocked"`
   - Blocked responses have `output = null`

### LLM Models in Dataset

- GPT: `gpt-4.1-2025-04-14`, `gpt-4-turbo-2024-04-09`, `gpt-3.5-turbo`
- Claude: `claude-3-opus-20240229`, `claude-3-sonnet-20240229`, `claude-3-haiku-20240307`
- Gemini: `gemini-1.5-pro`, `gemini-1.5-flash`, `gemini-1.0-pro`

---

## Database Schema Reference

### Entity Relationship Diagram

```
┌─────────────────┐
│     users       │
├─────────────────┤
│ id (TEXT PK)    │
│ name            │
│ email (UNIQUE)  │
│ vip (0 or 1)    │
│ created         │
│ updated         │
└────────┬────────┘
         │
         │ 1:N
         │
┌────────▼────────────┐
│   conversations     │
├─────────────────────┤
│ id (TEXT PK)        │
│ title               │
│ user_id (FK)        │
│ created             │
│ updated             │
└────────┬────────────┘
         │
         │ 1:N
         │
┌────────▼────────────┐       ┌─────────────────┐
│      prompts        │   N:1 │    policies     │
├─────────────────────┤◄──────┤─────────────────┤
│ id (TEXT PK)        │       │ id (TEXT PK)    │
│ conversation_id(FK) │       │ policy_name     │
│ text                │       │ policy_version  │
│ risk_score (0-3)    │       │ created         │
│ action*             │       │ updated         │
│ policy_id (FK)      │       └────────┬────────┘
│ created             │                │
│ updated             │                │ N:1
└────────┬────────────┘                │
         │                             │
         │ 1:N                         │
         │                             │
┌────────▼─────────────────────────────▼──┐
│          llm_responses                  │
├─────────────────────────────────────────┤
│ id (TEXT PK)                            │
│ conversation_id (FK → conversations)    │
│ prompt_id (FK → prompts)                │
│ completed_at                            │
│ model                                   │
│ risk_score (0-3)                        │
│ action* (none/blocked)                  │
│ policy_id (FK → policies)               │
│ output (JSON, null if blocked)          │
│ created                                 │
│ updated                                 │
└─────────────────────────────────────────┘

* action: "none" or "blocked"
```

### Relationships

- **users** → **conversations**: One-to-Many (one user can have many conversations)
- **conversations** → **prompts**: One-to-Many (one conversation can have many prompts)
- **conversations** → **llm_responses**: One-to-Many (one conversation can have many LLM responses)
- **prompts** → **llm_responses**: One-to-Many (one prompt can have multiple LLM responses)
- **policies** → **prompts**: One-to-Many (one policy can be applied to many prompts)
- **policies** → **llm_responses**: One-to-Many (one policy can be applied to many LLM responses)

### Dataset Size

The API contains:

- **100 users** (~10% are VIP)
- **10 policies** with different names and versions
- **~3,564 conversations**
- **~150,000+ prompts** (1 to 1,000 per conversation)
- **~100,000+ LLM responses** (~80% of non-blocked prompts have responses)

**Risk Distribution:**

- 70% risk_score = 0 (none)
- 20% risk_score = 1 (low)
- 7% risk_score = 2 (medium)
- 3% risk_score = 3 (high) ⚠️ **ALERTS**

This means you'll have thousands of alerts to work with!

---

## Submission Guidelines

1. **Share your repository** - GitHub/GitLab link with source code - OR a zip file of all files
2. **Include a README** - Setup instructions and any notes
3. **Deploy (optional but impressive)** - Vercel, Netlify, etc.
4. **Document your approach** - Brief explanation of your decisions
5. **Important**: If you do use AI let us know what tools you used

### What We'll Evaluate

- **Functionality** - Does it work? Does it solve the problem?
- **Code Quality** - Clean, readable, well-organized code
- **UX/UI Design** - Intuitive interface, good visual hierarchy
- **Data Handling** - Proper use of pagination, filtering, and relationships
- **Performance** - Efficient data fetching and rendering
- **Bonus Points** - Creative features, thoughtful error handling, accessibility

---

## Questions?

If you have any questions about the API or assignment, feel free to reach out! You can email me at mateo@witness.ai.

Good luck! 🚀
