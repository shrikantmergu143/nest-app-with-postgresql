DO $$
    
    BEGIN 
    
        INSERT INTO admin ("id","first_name","last_name","email","password","created_at") VALUES
    
        ('ca45fdb7-659c-4593-9f76-0cd102509a92','Shrikant','Admin','shrikant@appristine.in','$2b$10$LHegJ7KFRLor4UEoSshPbu5.lj1SEgfjRJQadqNeCW/1xGVVtEQY6', NOW());
        
    
    END $$;