package com.revature.test.service;

import static org.junit.Assert.*;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import com.revature.dao.UserDAO;
import com.revature.model.PHash;
import com.revature.model.User;
import com.revature.service.UserService;

public class UserServiceTest {
	UserService us = new UserService();
	User ua, ub;

	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
	}

	@AfterClass
	public static void tearDownAfterClass() throws Exception {
	}

	@Before
	public void setUp() throws Exception {
	}

	@After
	public void tearDown() throws Exception {
	}
	
	@Test
	public void testInstantiate() {
		UserDAO ud = new UserDAO();
		us = new UserService(ud);
		
		assertNotNull(us);
	}

	@Test
	public void testAdd() {
		PHash ph = new PHash(); ph.setPassword("something");
		ua = new User(1, "Twonk", ph);
		
	    us.registerUser(ua);
	    assertTrue(us.exist(ua));
	}

	@Test
	public void testDeleteAdd() {
		PHash ph = new PHash(); ph.setPassword("something");
		ua = new User(1, "Twonk", ph);
		
	    us.registerUser(ua);
	    assertTrue(us.exist(ua));
	}

	@Test
	public void testFindByName() {
		PHash ph = new PHash(); ph.setPassword("something");
		ua = new User(1, "Twonk", ph);
		
		us.removeUser(ua);
	    us.registerUser(ua);
	    assertTrue(us.existByName(ua.getName()));
	}

	@Test
	public void testFindByWrongName() {
		PHash ph = new PHash(); ph.setPassword("something");
		ua = new User(1, "Twonk", ph);
		
		us.removeUser(ua);
	    us.registerUser(ua);
	    assertFalse(us.existByName("IckyIckyIckyBotangWazoom"));
	}
	
	@Test
	public void getMaxNotNull() {
		assertNotNull(us.getMax());
	}

}
