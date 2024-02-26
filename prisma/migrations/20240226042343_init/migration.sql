-- CreateTable
CREATE TABLE "tb_users" (
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "google_id" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "tb_notes" (
    "note_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "tb_notes_pkey" PRIMARY KEY ("note_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_users_email_key" ON "tb_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tb_users_google_id_key" ON "tb_users"("google_id");

-- AddForeignKey
ALTER TABLE "tb_notes" ADD CONSTRAINT "tb_notes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "tb_users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
