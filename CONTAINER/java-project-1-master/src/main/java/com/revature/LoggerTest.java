package com.revature;
import org.apache.log4j.Logger;

public class LoggerTest {
	private static Logger log = Logger.getLogger(LoggerTest.class);

	public static void main(String[] args) {
		log.info("Logger confirmed working.");
	}

}
