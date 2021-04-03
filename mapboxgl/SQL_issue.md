1. 외래키 관련 에러
ALTER TABLE public."user"
DROP CONSTRAINT fk1;
ALTER TABLE public."bookmark"
   ADD CONSTRAINT FK_1 FOREIGN KEY (id)
      REFERENCES public."user" (id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
;