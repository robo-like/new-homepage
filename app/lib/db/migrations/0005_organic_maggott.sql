CREATE TABLE `support_tickets` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`subject` text NOT NULL,
	`message` text NOT NULL,
	`status` text DEFAULT 'OPEN' NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_support_tickets_user_id` ON `support_tickets` (`user_id`);--> statement-breakpoint
CREATE INDEX `idx_support_tickets_status` ON `support_tickets` (`status`);