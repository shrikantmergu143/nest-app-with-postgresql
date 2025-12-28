DO $$
    
    BEGIN 
    
        INSERT INTO role ("id","name","description","is_admin","created_at") VALUES
    
        ('58793cbc-d5ff-4400-854f-6dcd202bd2a7','Admin','Access to all Sections',True, NOW());
        
    
    END $$;