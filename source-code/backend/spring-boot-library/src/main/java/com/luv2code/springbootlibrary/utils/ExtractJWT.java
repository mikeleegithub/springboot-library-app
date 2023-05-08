package com.luv2code.springbootlibrary.utils;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

public class ExtractJWT {

    public static String payloadJWTExtraction(String token, String extraction) {

        // token = JWT
        token.replace("Bearer ", "");

        //break into three different chunks, which is header, payload, signature
        String[] chunks = token.split("\\.");
        Base64.Decoder decoder = Base64.getUrlDecoder();

        //decode JWT
        String payload = new String(decoder.decode(chunks[1]));

        //split elements by comma
        String[] entries = payload.split(",");
        Map<String, String> map = new HashMap<String, String>();

        for(String entry : entries) {
            String[] keyValue = entry.split(":");
            if (keyValue[0].equals(extraction)) { //pull out the information of sub which is our email

                int remove = 1;
                if (keyValue[1].endsWith("}")) {
                    remove = 2;
                }
                keyValue[1] = keyValue[1].substring(0, keyValue[1].length() - remove);
                keyValue[1] = keyValue[1].substring(1);

                map.put(keyValue[0], keyValue[1]);
            }
        }

        if (map.containsKey(extraction)) {
            return map.get(extraction);
        }
        return null;
    }
}
