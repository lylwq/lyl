/**
 * ==================================================================
 * Ҫ��
 * 1, ֻ����ָ����λ����д�Լ��Ĵ��룬���ļ�����������벻���޸�
 * 2, ������Ŀ�����������ȫ�ֱ�����
 * 3, ���ļ�Ӧ������firebug��console������ִ�У���������
 * 4, �����ִ��Ч�ʻ���Ϊ���е���Ҫ��׼
 * 5, ��3��
 * ==================================================================
 */

/**
 * ==================================================================
 * ��1: ʵ��һ�������������������г�Ա�ĵ�����
 * ==================================================================
 */
 
var each = function(obj, fn){
	//+++++++++++��������+++++++++++
	



	//+++++++++++�������+++++++++++
};

try{
	
	var data1 = [4,5,6,7,8,9,10,11,12];
	var data2 = {
		"a": 4,
		"b": 5,
		"c": 6
	};
	
	console.group(data1);
	
	each(data1, function(o){
		if( 6 == this )
			return true;
		else if( 8 == this )
			return false;
		console.log(o + ": \"" + this + "\"");
	});
	
	console.groupEnd();

	/*------[ִ�н��]------

	1: "4"
	2: "5"
	4: "7"

	------------------*/
	
	console.group(data2);
	
	each(data2, function(v, n){
		if( 5 == this )
			return true;
		console.log(n + ": \"" + v + "\"");
	});
	
	console.groupEnd();

	/*------[ִ�н��]------

	a: "4"
	c: "6"

	------------------*/
	
}catch(e){
	console.error("ִ�г���������Ϣ: " + e);
}

/**
 * ==================================================================
 * ��2: ʵ��һ����Man���࣬����attr, words, say��������
 * ==================================================================
 */
var Man;
//+++++++++++��������+++++++++++





//+++++++++++�������+++++++++++

try{
	
	var me = Man({ fullname: "С��" });
	var she = new Man({ fullname: "С��" });
	
	console.group();
	console.info("�ҵ������ǣ�" + me.attr("fullname") + "\n�ҵ��Ա��ǣ�" + me.attr("gender"));
	console.groupEnd();
	/*------[ִ�н��]------

	�ҵ������ǣ�С��
	�ҵ��Ա��ǣ�<�û�δ����>

	------------------*/

	me.attr("fullname", "С��");
	me.attr("gender", "��");
	me.fullname = "�ϲ�";
	me.gender = "����"; 
	she.attr("gender", "Ů");
	
	console.group();
	console.info("�ҵ������ǣ�" + me.attr("fullname") + "\n�ҵ��Ա��ǣ�" + me.attr("gender"));
	console.groupEnd();
	/*------[ִ�н��]------

	�ҵ������ǣ�С��
	�ҵ��Ա��ǣ���

	------------------*/
	
	console.group();
	console.info("�ҵ������ǣ�" + she.attr("fullname") + "\n�ҵ��Ա��ǣ�" + she.attr("gender"));
	console.groupEnd();
	/*------[ִ�н��]------

	�ҵ������ǣ�С��
	�ҵ��Ա��ǣ�Ů

	------------------*/

	me.attr({
		"words-limit": 3,
		"words-emote": "΢Ц"
	});
	me.words("��ϲ������Ƶ��");
	me.words("���ǵİ칫��̫Ư���ˡ�");
	me.words("��Ƶ����Ů��࣡");
	me.words("��ƽʱ�����ſᣡ");
	
	console.group();
	console.log(me.say());
	/*------[ִ�н��]------

	С��΢Ц��"��ϲ������Ƶ�����ǵİ칫��̫Ư���ˡ���Ƶ����Ů��࣡"

	------------------*/

	me.attr({
		"words-limit": 2,
		"words-emote": "��"
	});

	console.log(me.say());
	console.groupEnd();
	/*------[ִ�н��]------

	С������"��ϲ������Ƶ�����ǵİ칫��̫Ư���ˡ�"

	------------------*/
	
}catch(e){
	console.error("ִ�г���������Ϣ: " + e);
}



/**
 * ==================================================================
 * ��3: ʵ��һ��URI������������url��#֮��Ĳ���������ָ�������ݽṹ
 * ==================================================================
 */
function urlParser(s){
	//+++++++++++��������+++++++++++



		
	//+++++++++++�������+++++++++++
}

try{
	var url1 = "http://www.abc.com/m/s/#page/2/?type=latest_videos&page_size=20";
	var url2 = "http://www.abc.com/m/s/#type=latest_videos&page_size=20";
	var url3 = "http://www.abc.com/m/s/#page?type=latest_videos&page_size=20";

	console.group();
	console.info( urlParser(url1) );
	console.info( urlParser(url2) );
	console.info( urlParser(url3) );
	console.groupEnd();
	/*------[ִ�н��]------

	["page", "2", { "type": "latest_videos", "page_size": 20 }]
	[{ "type": "latest_videos", "page_size": 20 }]
	["page", { "type": "latest_videos", "page_size": 20 }]
	
	------------------*/
	
}catch(e){
	console.error("ִ�г���������Ϣ: " + e);
}aa