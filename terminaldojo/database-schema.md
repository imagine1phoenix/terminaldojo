# Database Schema

## Users
### users
- id (UUID)
- email
- username
- display_name
- avatar_url
- level (integer)
- total_xp (integer)
- current_streak (integer)
- longest_streak (integer)
- subscription_tier (free/pro/team)
- created_at
- last_active_at

## Command Catalog
### categories
- id
- name (for example: Linux Core, Git, Docker)
- slug
- description
- icon
- color
- sort_order
- parent_category_id (nullable, for sub-categories)

### commands
- id
- category_id (FK)
- name (for example: grep)
- slug
- short_description
- full_description (MDX)
- syntax_template (for example: grep [OPTIONS] PATTERN [FILE...])
- man_page_url
- difficulty (beginner/intermediate/advanced)
- danger_level (safe/caution/dangerous)
- os_compatibility (linux/mac/both/windows)
- tags (array)
- created_at

### command_flags
- id
- command_id (FK)
- flag (for example: -r, --recursive)
- long_form
- description
- example
- is_common (boolean)
- sort_order

### command_examples
- id
- command_id (FK)
- title
- command_text
- explanation
- expected_output
- difficulty
- is_real_world (boolean)
- sort_order

## Learning Content
### lessons
- id
- category_id (FK)
- title
- slug
- content (MDX)
- commands_covered (array of command_ids)
- difficulty
- estimated_minutes
- sort_order
- prerequisites (array of lesson_ids)
- xp_reward

### challenges
- id
- lesson_id (FK, nullable)
- title
- description
- instructions (MDX)
- initial_file_system (JSON, defines sandbox state)
- hints (JSON array, progressive hints)
- solution_commands (JSON array)
- validation_type (output_match/file_check/regex/custom)
- validation_rules (JSON)
- difficulty
- xp_reward
- time_limit_seconds (nullable)
- tags

## Guided Curriculum
### learning_paths
- id
- title
- slug
- description
- target_audience
- estimated_hours
- difficulty
- icon
- is_premium (boolean)

### learning_path_items
- id
- learning_path_id (FK)
- item_type (lesson/challenge/quiz)
- item_id
- sort_order

## User Progress
### user_lesson_progress
- user_id (FK)
- lesson_id (FK)
- status (not_started/in_progress/completed)
- completed_at
- xp_earned

### user_challenge_progress
- user_id (FK)
- challenge_id (FK)
- status (not_started/attempted/completed)
- attempts (integer)
- best_time_seconds
- submitted_commands (JSON)
- completed_at
- xp_earned

### user_command_familiarity
- user_id (FK)
- command_id (FK)
- familiarity_level (1-5)
- times_practiced
- last_practiced_at
- next_review_at (spaced repetition)

## Achievements and Badges
### badges
- id
- name
- description
- icon
- criteria (JSON, rules to earn)
- xp_reward
- rarity (common/rare/epic/legendary)

### user_badges
- user_id (FK)
- badge_id (FK)
- earned_at

## Activity and Personalization
### user_daily_activity
- user_id (FK)
- date
- commands_practiced
- challenges_completed
- xp_earned
- minutes_spent

### user_bookmarks
- user_id (FK)
- item_type (command/lesson/challenge)
- item_id
- created_at

### user_notes
- id
- user_id (FK)
- command_id (FK, nullable)
- lesson_id (FK, nullable)
- content
- created_at
