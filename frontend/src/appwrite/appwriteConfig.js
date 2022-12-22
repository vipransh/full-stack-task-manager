import {Client, Account, Databases} from 'appwrite';

const client= new Client();

client.setEndpoint("http://localhost/v1").setProject("appwrite project Id");

export const account=new Account(client);

// database

export const databases=new Databases(client,"appwrite database Id");