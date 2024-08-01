
CREATE TABLE "public"."users" ("id" uuid NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id","email") , UNIQUE ("id"), UNIQUE ("email"));COMMENT ON TABLE "public"."users" IS E'users for todo app';
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_users_updated_at"
BEFORE UPDATE ON "public"."users"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_users_updated_at" ON "public"."users"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE TABLE "public"."tasks" ("id" uuid NOT NULL, "title" text NOT NULL, "description" text, "is_complete" boolean NOT NULL DEFAULT false, "user_id" uuid NOT NULL, "due_date" timestamptz, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("id"));COMMENT ON TABLE "public"."tasks" IS E'tasks per user';
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_tasks_updated_at"
BEFORE UPDATE ON "public"."tasks"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_tasks_updated_at" ON "public"."tasks"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
