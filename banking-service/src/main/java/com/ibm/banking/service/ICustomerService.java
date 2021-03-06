package com.ibm.banking.service;

import javax.validation.Valid;

import com.ibm.banking.exception.BankingApplicationException;
import com.ibm.banking.model.Customer;

public interface ICustomerService {

	
	public boolean customerCreate(@Valid Customer customer) throws BankingApplicationException;
	
	
	public boolean updateCustomer(Customer updatedCustomer) throws BankingApplicationException;


	public Customer getById(String id) throws BankingApplicationException;


	public boolean delete(String id) throws BankingApplicationException;


	boolean updateBalance(Customer customer, double amount) throws BankingApplicationException;
	
		
}

