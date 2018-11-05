/* sqlite3 */
CREATE TABLE [todos](
    [id] CHAR(32) NOT NULL,
    [title] TEXT NOT NULL,
    [done] BOOLEAN NOT NULL DEFAULT false,
    [reg_dt] TIMESTAMP NOT NULL,
    [done_dt] TIMESTAMP);
