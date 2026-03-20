# Bridges: Federated Communities for Open Educational Resource Curation
## Product Reference Document v1.0

**Date**: March 2026
**Author**: Doug Belshaw
**Status**: Ready for development

---

## 1. Vision

Bridges is a Bonfire extension that enables educators to form communities, collaboratively curate collections of open educational resources (OER), and discover quality teaching materials through federated social signals. It realises the original MoodleNet vision (2018–2020) — a federated social network for educators to share and curate OER — using Bonfire Networks as the underlying federated app toolkit.

Unlike centralised OER repositories, Bridges distributes curation responsibility across independent communities whilst maintaining federation, allowing educators on different instances to collaborate across instance boundaries. Any ActivityPub-enabled server can follow collections. Only Bonfire instances can host communities and contribute to them.

---

## 2. Background

The original MoodleNet project (led by Doug Belshaw, 2018–2020) was built on Elixir and Phoenix LiveView and introduced the concept of federated communities curating collections of OER. After the original team departed, the codebase evolved through CommonsPub into Bonfire Networks, maintained by Mayel de Borniol, Ivan Minutillo, and others.

The moodle.net service closes on 20 April 2026. Bridges is not a fork of MoodleNet. It is a new Bonfire extension inspired by the original vision.

---

## 3. Core Entities

### 3.1 Communities

A Community is a federated group of educators with a shared interest, subject area, or institutional context. Communities are hosted on a specific Bonfire instance (their home instance) but joinable by educators on other Bonfire instances, subject to permission settings.

Communities are implemented using Bonfire's existing Groups functionality with Bridges-specific metadata attached.

**Fields:** name, description, subject tags (ISCED codes or free tags), language (BCP 47), home instance, permission mode, ActivityPub actor ID, timestamps.

### 3.2 Collections

A Collection is a curated ordered set of resources owned by a Community. Collections are followable by any ActivityPub-enabled server. Only Community members can add resources to a Collection.

**Fields:** title, description, tags, language, parent community, ordering mode, visibility override, ActivityPub object ID, timestamps.

### 3.3 Resources

A Resource is a reference to an open educational material. Resources can be links to external OER repositories, institutional repositories, or individual web pages. File upload is out of scope for v1.0 — links only.

**Fields:** title, description, URL, license (SPDX identifier), subject tags, language, level (primary / secondary / higher / professional / other), media type (video / document / interactive / course / link / other), attribution, added by, ActivityPub object ID, timestamps.

**Optional AI-enriched fields (instance-level opt-in):** auto-generated subject tags, auto-detected language and level, auto-generated summary.

AI enrichment runs at point of submission. AI-generated metadata is clearly labelled and stored separately from human-provided metadata. The home instance's metadata is canonical — in any conflict between instances, the home instance wins.

---

## 4. User Roles

**Visitor**: Any user, authenticated or not, on any server. Can browse public Communities and follow public Collections.

**Follower**: Any ActivityPub user on any server who follows a Collection. Receives feed updates when new resources are added. Cannot contribute.

**Community Member**: Authenticated Bonfire user who has joined a Community. Can add resources to Collections, and boost and like resources.

**Community Moderator**: A Community Member with elevated permissions. Can remove resources from Collections, remove members, and manage Community settings.

**Instance Admin**: Controls the Bonfire instance. Can set default permission models for Communities hosted on their instance. Can defederate from other instances.

---

## 5. Permission Models

**Open**: Any authenticated user on any Bonfire instance can join the Community.

**Request access**: Any authenticated user on any Bonfire instance can request to join. A Moderator approves or rejects requests.

**Instance-restricted**: Membership is limited to members of a specific Group on the home instance. Other instances can still see and follow Collections, but cannot join the Community.

Collections inherit their parent Community's visibility by default. A Moderator can override this per Collection. Defederation is handled at the instance level via Bonfire's existing mechanisms.

---

## 6. Collection Ordering

**Chronological**: Resources listed in the order they were added, newest last.

**Engagement**: Resources ordered by number of likes and boosts, highest first. Engagement counts on the home instance are canonical.

**Manual**: The Collection owner or a Moderator reorders resources by hand.

---

## 7. Discovery

There is no centralised registry. Discovery happens through Bonfire's existing federation and social mechanisms.

Educators find Communities through:

- Search on their local Bonfire instance
- Following links shared on other ActivityPub servers (Mastodon etc.)
- An optional Community directory page on their instance
- Social signals — if someone they follow joins or boosts a Collection, it surfaces in their feed

Educators on non-Bonfire ActivityPub servers (e.g. Mastodon) can follow Collections and receive updates but cannot join Communities or contribute resources.

---

## 8. Federation Behaviour

Bridges uses Bonfire's existing ActivityPub adapter with custom ActivityStreams types defined via JSON-LD for Community, Collection, and Resource objects.

**Key rules:**

- The home instance is authoritative on metadata, membership, and moderation.
- Adding a resource to a Collection sends an ActivityPub Create activity to all followers of that Collection.
- Likes and boosts federate normally via ActivityPub. Home instance engagement counts are canonical for ordering.
- If a home instance goes offline, other instances retain cached content. Admins on other instances can stand up a new instance to re-host the Community if demand warrants it.
- Dead resource links are a natural part of the web. The UI should surface a Wayback Machine fallback link when a resource URL returns a non-200 response.

---

## 9. Database Schema

Four tables, all using Needle mixins for compatibility with Bonfire's pointer system.

### bridges_communities

| Field | Type | Notes |
|---|---|---|
| id | ULID | Needle pointer, primary key |
| name | string | Required |
| description | text | Optional |
| subject_tags | array | ISCED codes or free tags |
| language | string | BCP 47 language code |
| permission_mode | enum | open, request, instance_restricted |
| canonical_url | string | ActivityPub actor ID |
| inserted_at | timestamp | |
| updated_at | timestamp | |

### bridges_collections

| Field | Type | Notes |
|---|---|---|
| id | ULID | Needle pointer, primary key |
| community_id | ULID | FK to bridges_communities |
| title | string | Required |
| description | text | Optional |
| tags | array | |
| language | string | BCP 47 language code |
| ordering_mode | enum | chronological, engagement, manual |
| visibility_override | enum | null (inherit), public, members_only |
| canonical_url | string | ActivityPub object ID |
| inserted_at | timestamp | |
| updated_at | timestamp | |

### bridges_resources

| Field | Type | Notes |
|---|---|---|
| id | ULID | Needle pointer, primary key |
| title | string | Required |
| description | text | Optional |
| url | string | Required |
| license | string | SPDX identifier preferred |
| subject_tags | array | |
| language | string | BCP 47 language code |
| level | enum | primary, secondary, higher, professional, other |
| media_type | enum | video, document, interactive, course, link, other |
| attribution | string | Author / creator credit |
| added_by_id | ULID | FK to Needle pointer (Bonfire user) |
| ai_enriched | boolean | Whether AI metadata has been applied |
| canonical_url | string | ActivityPub object ID |
| inserted_at | timestamp | |
| updated_at | timestamp | |

### bridges_collection_resources

| Field | Type | Notes |
|---|---|---|
| id | ULID | Needle pointer, primary key |
| collection_id | ULID | FK to bridges_collections |
| resource_id | ULID | FK to bridges_resources |
| position | integer | For manual ordering |
| inserted_at | timestamp | |

---

## 10. Extension Structure

```
bonfire_bridges/
  lib/
    bonfire_bridges/
      communities.ex
      collections.ex
      resources.ex
      federation/
        activity_pub.ex
    bonfire_bridges_web/
      routes.ex
      live/
        community_live.ex
        collection_live.ex
        resource_live.ex
      components/
        community_card.ex
        collection_card.ex
        resource_card.ex
  priv/
    repo/
      migrations/
        001_create_bridges_communities.exs
        002_create_bridges_collections.exs
        003_create_bridges_resources.exs
        004_create_bridges_collection_resources.exs
  mix.exs
  bonfire_bridges.exs
```

---

## 11. ActivityPub Object Types

**BridgesCommunity** — extends `Group`
**BridgesCollection** — extends `OrderedCollection`
**BridgesResource** — extends `Document` with OER metadata properties

Instances running Bridges render these natively. Instances not running Bridges fall back to Bonfire's default unknown-type rendering using name, summary, and URL.

---

## 12. UI Requirements

**Community Directory page**: Lists Communities hosted on or known to the local instance. Filterable by subject tag, language, and permission mode. Each card shows name, description, member count, and collection count.

**Community page**: Description, member list (if permitted), list of Collections.

**Collection page**: Description, ordered list of Resources. Each Resource shows title, description, URL, licence, and engagement signals. Follow button for non-members. Add resource form for members. Supports all three ordering modes.

**Resource submission form**: Fields for title, URL, description, licence, subject tags, language, level, media type, and attribution. If AI enrichment is enabled on the instance, suggested metadata is shown after submission for user confirmation before saving.

**Wayback Machine fallback**: When a resource URL returns a non-200 response, display a "Try Wayback Machine" link alongside the dead URL.

---

## 13. Out of Scope for v1.0

- Direct file upload (links only)
- LMS integrations (Moodle, Canvas etc.)
- Native mobile app
- IPFS or distributed storage
- Automated quality scoring beyond social signals
- Paid or premium features

---

## 14. Open Questions

- Which Bonfire flavour to develop against first — Bonfire Social or the Open Science Network flavour?
- Should the Community directory page ship as a default or be an instance admin opt-in?
- Full SPDX licence list or a curated shortlist of common OER licences?

---

## 15. References

- Bonfire Networks: https://bonfirenetworks.org
- Bonfire extension documentation: https://bonfirenetworks.org/courses/extension/how_to_create_extension/
- Bonfire extension template: https://github.com/bonfire-networks/bonfire_extension_template
- Needle pointer system: https://github.com/bonfire-networks/needle
- Original MoodleNet blog: https://blog.moodle.net
- Doug Belshaw on MoodleNet: https://dougbelshaw.com/blog/tag/moodlenet/
- ActivityPub specification: https://www.w3.org/TR/activitypub/
- SPDX licence list: https://spdx.org/licenses/
- ISCED subject classification: https://uis.unesco.org/en/topic/international-standard-classification-education-isced
