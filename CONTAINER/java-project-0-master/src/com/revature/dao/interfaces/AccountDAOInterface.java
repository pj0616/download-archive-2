package com.revature.dao.interfaces;

import java.util.TreeSet;

import com.revature.enums.AccountType;
import com.revature.model.Account;
import com.revature.model.User;

public interface AccountDAOInterface {
	public void createAccount(Account a);
	public void createUserAccount(long ownerID, long acctNum);
	public void deleteAccount(Account a);
	public void deleteAccountByUID(long uid);
	public TreeSet<Account> readAllAccounts();
	public TreeSet<Account> readAllByType(AccountType type);
	public TreeSet<Account> readAllByUser(User u);
	public TreeSet<Account> readAllByUserUID(Long uid);
	public Account readAccount(Account a);
	public Account readAccountByUID(long uid);
	public void updateAccount(Account a);
}
