<%@ WebHandler Language="C#" Class="Handler" %>

using System;
using System.Net;
using System.Web;
using System.IO;
using System.Text;

public class Handler : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        string url = context.Request.RawUrl.ToString();
        string[] css;
        string style="";
        StringBuilder sb = new StringBuilder();
        string pre = "http://lyl.qbaobei.com/hqew/loadcss/", suf = ");\n";
        char[] oper={'&'};
        css = url.Substring(url.IndexOf("?")).Replace("?", "").Split(oper);

        HttpWebRequest hwr;
        Stream stm = null;
        StreamReader reader = null;
        for (int i = 0, len = css.Length; i < len; i+=1 )
        {
            //style += pre + css[i].ToString() + suf;
            hwr = (HttpWebRequest)HttpWebRequest.Create(pre+css[i]);
            stm = hwr.GetResponse().GetResponseStream();
            reader = new StreamReader(stm, Encoding.GetEncoding("utf-8"));
            sb.Append(reader.ReadToEnd());
        }
        stm.Close(); 
        reader.Close();

        
        context.Response.ContentType = "text/css";
        context.Response.Write(sb);
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}