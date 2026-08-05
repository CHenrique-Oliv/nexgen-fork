import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.text.*;
import java.util.*;
import java.util.zip.*;
import java.math.*;
import xseedRts.*;
import java.sql.Connection;



public class RulComandosBanco extends XseedRule
{
/**Fields*/
/**Attributes*/
String banco				= "";
@Deprecated
public String isNull		= "";
@Deprecated
public String noLock		= "";
@Deprecated
public String subString		= "";
@Deprecated
public String updLock		= "";
@Deprecated
public String forUpDate		= "";
public String maxOracleInc	= "";
public String maxOracleFim	= "";
@Deprecated
public String sqlTop		= "";
@Deprecated
public String oracleRownum 	= "";
@Deprecated
public String postGreLimit 	= "";
@Deprecated
public String varchar 		= "";
@Deprecated
public boolean isSql 		= false;
@Deprecated
public boolean isOracle 	= false;
@Deprecated
public String xLock 		= "";
@Deprecated
public String numeric 		= "";
private XseedSession session;
private RulInterfaceBancos rulBanco		= null;
public final static String SQL_SERVER	= "SqlServer";
public final static String SQL_SERVER1	= "Sql-Server";
public final static String ORACLE		= "Oracle";
public final static String POSTGRE		= "PostGreSql";
private final static String DRIVER_ORA	= "oracle.jdbc.driver.OracleDriver";
private final static String DRIVER_SQL	= "com.microsoft.sqlserver.jdbc.SQLServerDriver";
private final static String DRIVER_PGS	= "org.postgresql.Driver";




public void associationsInitialize ()
    throws Exception
{
}

/*
 *-----------------------------------------------------------------------------------------------
 *Agora a implementacao foi feita por interface. Tem-se uma interface que eh a RulInterfaceBancos
 *e todas as classes que queiram lidar com o banco de dados devem implementa-la. Atualmente temos
 *tres:
 * @ - RulBancoOracle		- Para o SGBD Oracle
 * @ - RulBancoPostGre		- Para o SGBD PostGre
 * @ - RulBancoSqlServer	- Para o SGBD MS SQL Server
 *-----------------------------------------------------------------------------------------------
 */

public String getIsNull() throws Exception {
	return rulBanco.getIsNull();
}

public String getNoLock() throws Exception {
	return rulBanco.getNoLock();
}

public String getSubString() throws Exception {
	return rulBanco.getSubString();
}

public String getRTrim() throws Exception {
	return rulBanco.getRTrim();
}

public String getLTrim() throws Exception {
	return rulBanco.getLTrim();
}

public String getUpdLock() throws Exception {
	return rulBanco.getUpdLock();
}

public String getForUpDate() throws Exception {
	return rulBanco.getForUpdate();
}

public String getSqlTop() throws Exception {
	return rulBanco.getSqlTop();
}

public String getVarchar() throws Exception {
	return rulBanco.getVarchar();
}

public String getNumeric() throws Exception {
	return rulBanco.getNumeric();
}

public String getXLock() throws Exception{
	return rulBanco.getXLock();
}

public String getConcat() throws Exception {
	return rulBanco.getConcat();
}

public String getLength() throws Exception {
	return rulBanco.getLength();
}

public boolean isSqlServer() throws Exception{
	return rulBanco.isSqlServer();
}

public boolean isOracle() throws Exception{
	return rulBanco.isOracle();
}

public boolean isPostGre() throws Exception{
	return rulBanco.isPostGre();
}

public void setLanguageEnglish()throws Exception{
	rulBanco.setLanguageEnglish();
}

public void initialize() throws Exception
{
}

/**
 * Construtor da classe
 * @param session
 * @throws Exception
 * @author Rafael Rocha
 */
 public RulComandosBanco(Object session) throws Exception{
	super((XseedSession)session);
	try {
		definirInstanciaDoBanco(session);
		isNull 		= rulBanco.getIsNull();
		noLock		= rulBanco.getNoLock();
		subString	= rulBanco.getSubString();
		sqlTop		= rulBanco.getSqlTopEspecificSQLServer();
		oracleRownum= rulBanco.getSqlTopEspecificOracle();
		postGreLimit= rulBanco.getSqlTopEspecificPostGre();
		varchar		= rulBanco.getVarchar();
		numeric		= rulBanco.getNumeric();
		forUpDate	= rulBanco.getForUpdate();
		isSql		= rulBanco.isSqlServer();
		isOracle	= rulBanco.isOracle();		
		xLock		= rulBanco.getXLock();
		updLock		= rulBanco.getUpdLock();
	} catch (Exception e) {
		// TODO: handle exception
		throw e;
	}
}

/**
 * Obtem o comando para se obter a Data direto do SGBD
 * @return
 * @throws Exception
 * @author Rafael Rocha
 */
public String getDateCommand() throws Exception
{
	try {
		return rulBanco.getDateCommand();
	} catch (Exception e) {
		// TODO: handle exception
		throw e;
	}
}

public void ativaLinguistic() throws Exception
{
	ativaLinguistic(session.DBConnection.connection, banco);
}
public  static void ativaLinguistic(Object session) throws Exception
{
	String banco = ((XseedSession)session).DBEngine;
	ativaLinguistic(((XseedSession)session).DBConnection.connection, banco);
}

public  static void ativaLinguistic( Connection connection,String banco) throws Exception
{
	if(banco.trim().equalsIgnoreCase("Oracle")){
		connection.createStatement().execute("alter session set NLS_COMP=LINGUISTIC");
		connection.createStatement().execute("alter session set NLS_SORT=LATIN_CI");
		
	}
}

public static String formatarCpfcnpjComandoSelect(String banco, String tabela, String nmCpfCnpj, String nmFilCnpj, String nmDgCpfCnpj, String nmCampoRetorno) throws Exception{
	
	try{
		String cpfCnpjRetorno = "";
		
		if(banco.trim().equalsIgnoreCase("ORACLE"))
		{
			  cpfCnpjRetorno = " case when " + tabela + "." + nmFilCnpj + " > 0 then ";
			  cpfCnpjRetorno = cpfCnpjRetorno + "SubStr(LPad(" + tabela + "." + nmCpfCnpj + ",8,'0') || ";
			  cpfCnpjRetorno = cpfCnpjRetorno + "LPad(" + tabela + "." + nmFilCnpj + ",4,'0') || ";
			  cpfCnpjRetorno = cpfCnpjRetorno + "LPad(" + tabela + "." + nmDgCpfCnpj + ",2,'0'),1,2) || '.' || ";
			  cpfCnpjRetorno = cpfCnpjRetorno + "SubStr(LPad(" + tabela + "." + nmCpfCnpj + ",8,'0') || ";
			  cpfCnpjRetorno = cpfCnpjRetorno + "LPad(" + tabela + "." + nmFilCnpj + ",4,'0') || ";
			  cpfCnpjRetorno = cpfCnpjRetorno + "LPad(" + tabela + "." + nmDgCpfCnpj + ",2,'0'),3,3) || '.' || ";
			  cpfCnpjRetorno = cpfCnpjRetorno + "SubStr(LPad(" + tabela + "." + nmCpfCnpj + ",8,'0') || ";
			  cpfCnpjRetorno = cpfCnpjRetorno + "LPad(" + tabela + "." + nmFilCnpj + ",4,'0') || ";
			  cpfCnpjRetorno = cpfCnpjRetorno + "LPad(" + tabela + "." + nmDgCpfCnpj + ",2,'0'),6,3) || '/' || ";
			  cpfCnpjRetorno = cpfCnpjRetorno + "SubStr(LPad(" + tabela + "." + nmFilCnpj + ",8,'0') || ";
			  cpfCnpjRetorno = cpfCnpjRetorno + "LPad(" + tabela + "." + nmFilCnpj + ",4,'0') || ";
			  cpfCnpjRetorno = cpfCnpjRetorno + "LPad(" + tabela + "." + nmDgCpfCnpj + ",2,'0'),9,4) || '-' || ";
			  cpfCnpjRetorno = cpfCnpjRetorno + "SubStr(LPad(" + tabela + "." + nmFilCnpj + ",8,'0') || ";
			  cpfCnpjRetorno = cpfCnpjRetorno + "LPad(" + tabela + "." + nmFilCnpj + ",4,'0') || ";
			  cpfCnpjRetorno = cpfCnpjRetorno + "LPad(" + tabela + "." + nmDgCpfCnpj + ",2,'0'),13,2)";
			  cpfCnpjRetorno = cpfCnpjRetorno + " else ";
			  cpfCnpjRetorno = cpfCnpjRetorno + "SubStr(LPad(" + tabela + "." + nmCpfCnpj + ",9,'0') || ";
			  cpfCnpjRetorno = cpfCnpjRetorno + "LPad(" + tabela + "." + nmDgCpfCnpj + ",2,'0'),1,3) || '.' || ";
			  cpfCnpjRetorno = cpfCnpjRetorno + "SubStr(LPad(" + tabela + "." + nmCpfCnpj + ",9,'0') || ";
			  cpfCnpjRetorno = cpfCnpjRetorno + "LPad(" + tabela + "." + nmDgCpfCnpj + ",2,'0'),4,3) || '.' || ";
			  cpfCnpjRetorno = cpfCnpjRetorno + "SubStr(LPad(" + tabela + "." + nmCpfCnpj + ",9,'0') || ";
			  cpfCnpjRetorno = cpfCnpjRetorno + "LPad(" + tabela + "." + nmDgCpfCnpj + ",2,'0'),7,3) || '-' || ";
			  cpfCnpjRetorno = cpfCnpjRetorno + "SubStr(LPad(" + tabela + "." + nmCpfCnpj + ",9,'0') || ";
			  cpfCnpjRetorno = cpfCnpjRetorno + "LPad(" + tabela + "." + nmDgCpfCnpj + ",2,'0'),10,2) ";
			  cpfCnpjRetorno = cpfCnpjRetorno + " end " + nmCampoRetorno;
		} 
		else if (banco.trim().equalsIgnoreCase("SQLSERVER"))
		{
			  cpfCnpjRetorno = " case when " + tabela + "." + nmFilCnpj + " > 0 then ";
			  cpfCnpjRetorno = cpfCnpjRetorno + "Substring(replace(str(" + tabela + "." + nmCpfCnpj + ",8),' ','0') + ";
			  cpfCnpjRetorno = cpfCnpjRetorno + "replace(str(" + tabela + "." + nmFilCnpj + ",4),' ','0') + ";
			  cpfCnpjRetorno = cpfCnpjRetorno + "replace(str(" + tabela + "." + nmDgCpfCnpj + ",2),' ','0'),1,2) + '.' + ";
			  cpfCnpjRetorno = cpfCnpjRetorno + "Substring(replace(str(" + tabela + "." + nmCpfCnpj + ",8),' ','0') + ";
			  cpfCnpjRetorno = cpfCnpjRetorno + "replace(str(" + tabela + "." + nmFilCnpj + ",4),' ','0') + ";
			  cpfCnpjRetorno = cpfCnpjRetorno + "replace(str(" + tabela + "." + nmDgCpfCnpj + ",2),' ','0'),3,3) + '.' + ";
			  cpfCnpjRetorno = cpfCnpjRetorno + "Substring(replace(str(" + tabela + "." + nmCpfCnpj + ",8),' ','0') + ";
			  cpfCnpjRetorno = cpfCnpjRetorno + "replace(str(" + tabela + "." + nmFilCnpj + ",4),' ','0') + ";
			  cpfCnpjRetorno = cpfCnpjRetorno + "replace(str(" + tabela + "." + nmDgCpfCnpj + ",2),' ','0'),6,3) + '/' + ";
			  cpfCnpjRetorno = cpfCnpjRetorno + "Substring(replace(str(" + tabela + "." + nmFilCnpj + ",8),' ','0') + ";
			  cpfCnpjRetorno = cpfCnpjRetorno + "replace(str(" + tabela + "." + nmFilCnpj + ",4),' ','0') + ";
			  cpfCnpjRetorno = cpfCnpjRetorno + "replace(str(" + tabela + "." + nmDgCpfCnpj + ",2),' ','0'),9,4) + '-' + ";
			  cpfCnpjRetorno = cpfCnpjRetorno + "Substring(replace(str(" + tabela + "." + nmFilCnpj + ",8),' ','0') + ";
			  cpfCnpjRetorno = cpfCnpjRetorno + "replace(str(" + tabela + "." + nmFilCnpj + ",4),' ','0') + ";
			  cpfCnpjRetorno = cpfCnpjRetorno + "replace(str(" + tabela + "." + nmDgCpfCnpj + ",2),' ','0'),13,2)";
			  cpfCnpjRetorno = cpfCnpjRetorno + " else ";
			  cpfCnpjRetorno = cpfCnpjRetorno + "Substring(replace(str(" + tabela + "." + nmCpfCnpj + ",9),' ','0') + ";
			  cpfCnpjRetorno = cpfCnpjRetorno + "replace(str(" + tabela + "." + nmDgCpfCnpj + ",2),' ','0'),1,3) + '.' + ";
			  cpfCnpjRetorno = cpfCnpjRetorno + "Substring(replace(str(" + tabela + "." + nmCpfCnpj + ",9),' ','0') + ";
			  cpfCnpjRetorno = cpfCnpjRetorno + "replace(str(" + tabela + "." + nmDgCpfCnpj + ",2),' ','0'),4,3) + '.' + ";
			  cpfCnpjRetorno = cpfCnpjRetorno + "Substring(replace(str(" + tabela + "." + nmCpfCnpj + ",9),' ','0') + ";
			  cpfCnpjRetorno = cpfCnpjRetorno + "replace(str(" + tabela + "." + nmDgCpfCnpj + ",2),' ','0'),7,3) + '-' + ";
			  cpfCnpjRetorno = cpfCnpjRetorno + "Substring(replace(str(" + tabela + "." + nmCpfCnpj + ",9),' ','0') + ";
			  cpfCnpjRetorno = cpfCnpjRetorno + "replace(str(" + tabela + "." + nmDgCpfCnpj + ",2),' ','0'),10,2) ";
			  cpfCnpjRetorno = cpfCnpjRetorno + " end " + nmCampoRetorno;
		}
		
		return cpfCnpjRetorno;
		
	} catch (Exception e) {
		throw e;
	}
	
	
}

public static String montarLikeConsultaDB(String like) throws Exception{
	if(!like.equals("")){
		String[] palavras = like.split(" ");
		like = "%%";
		int i = 1;
		for(String palavra : palavras){
			if(i == 1)
				like += "%"+palavra+"%";
			else
				like += " %"+palavra+"%";
			i++;
		}
	}
	
	return like;
}

/**
 * Retorna o comando para concatenar.
 * @author Rafael Rocha
 */
public  String concat(){
	return rulBanco.concat();
}

/**
 * Converte para Char de acordo com o banco.
 * @param nomeCampo
 * @param quantidadeInteiros
 * @param quantidadeCasasDecimais
 * @return
 * @author Rafael Rocha
 */
public  String toChar(String nomeCampo,int quantidadeInteiros, int quantidadeCasasDecimais){
	return rulBanco.toChar(nomeCampo, quantidadeInteiros, quantidadeCasasDecimais);
}

/**
 * Define qual sera ainterface a ser instanciada
 * @throws Exception
 * @author Rafael Rocha
 * @since Nexgen2.3 dia 02/09/2014 as 14:37
 * @see Veja a ocorrencia 54990
 */
public void definirInstanciaDoBanco(Object session) throws Exception{
	try {
		//-------------------------------------------------------------
		// O atributo DBEngine eh definido em tempo de execucao pelo
		// contexto (arquivo xml do contexto) e coloca o banco de dados
		// apropriado, essa configuracao eh feita pela classe Ini.java
		//-------------------------------------------------------------
		banco = ((XseedSession)session).DBEngine.trim();
		if(banco.equalsIgnoreCase(SQL_SERVER) || banco.equalsIgnoreCase(SQL_SERVER1)){
			rulBanco = new RulBancoSqlServer();
		}else if(banco.equalsIgnoreCase(ORACLE)){
			rulBanco = new RulBancoOracle();
		}else if(banco.equalsIgnoreCase(POSTGRE)){
			rulBanco = new RulBancoPostGre();
		}
	} catch (Exception e) {
		// TODO: handle exception
		throw e;
	}
}

public String getIdSessionFromDB() throws Exception
{
	try{
		return rulBanco.getIdSessionCommand();
	} catch (Exception e) {
		throw e;
	}
}

/**
 * Repete um caracter um determinado numero de vezes
 * @param nmCampo : Nome do campo
 * @param charParaRepetir : Caractere que ira se repitir
 * @param vezes : numeros de vezes que o caracter ira se repetir. Nao ultrapassar 25 por conta do SQL Server
 * @return
 * @throws Exception
 */
public String repetirUmCaracterAEsquerda(String nmCampo, String charParaRepetir, String vezes) throws Exception{
	return rulBanco.repetirCaracterAEsquerda(nmCampo, charParaRepetir, vezes);
}



} /** End Class */
