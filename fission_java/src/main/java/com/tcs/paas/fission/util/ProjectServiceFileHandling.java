package com.tcs.paas.fission.util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.io.File;

@Component
public class ProjectServiceFileHandling
{
    @Autowired
    FunctionUtil functionUtil;

    public int createDirectory(File file)
    {
        try
        {
//            int makeDirectory = file.mkdirs()? 1 : 0;
//            functionUtil.addTemplatesToProjectDirectory(file);
            return file.mkdirs()? 1 : 0;
        }
        catch (Exception e)
        {
            System.out.println("Unable to Create Directory");
            e.printStackTrace();
            
        }
        return 0;
    }

    /*    public HashSet<PosixFilePermission> getPermissions()
        {
            HashSet<PosixFilePermission> set = new HashSet<>();
            //Adding owner's file permissions
            set.add(PosixFilePermission.OWNER_EXECUTE);
            set.add(PosixFilePermission.OWNER_READ);
            set.add(PosixFilePermission.OWNER_WRITE);
            //Adding group's file permissions
            set.add(PosixFilePermission.GROUP_EXECUTE);
            set.add(PosixFilePermission.GROUP_READ);
            set.add(PosixFilePermission.GROUP_WRITE);
            //Adding other's file permissions
            set.add(PosixFilePermission.OTHERS_EXECUTE);
            set.add(PosixFilePermission.OTHERS_READ);
            set.add(PosixFilePermission.OTHERS_WRITE);

            return set;
        }
    */
    public  boolean deleteDir(File dir)
    {
        if (dir.isDirectory()) {
            String[] children;
            children = dir.list();
            if( children != null)
            {
                for (String child : children) {
                    boolean success = deleteDir(new File(dir, child));
                    if (!success) {
                        System.out.println("Unable to Delete Directory");
                        return false;
                    }
                }

            }

        }
        System.out.println("Directory"+dir);
        return dir.delete();


    }

/*
*   public static void recursiveDelete(File file) {
        //to end the recursive loop
        if (!file.exists())
            return true;

        //if directory, go inside and call recursively
        if (file.isDirectory()) {
            for (File f : file.listFiles()) {
                //call recursively
                recursiveDelete(f);
            }
        }
        //call delete to delete files and empty directory
        file.delete();
*
*
* */




}
