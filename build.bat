@echo on 

echo STEP-1: ����wepyģ��
echo STEP-2: ��װ����ģ��...

call cnpm install

echo STEP-3: ������

call cnpm run build

echo STEP-4: ���ɰ汾��Ϣ�ļ� version.txt
echo {"version":"1.0.0.%date:~0,4%%date:~5,2%%date:~8,2%%time:~0,2%%time:~3,2%%time:~6,2%","codeVersion":""} > build/version.txt

echo STEP-5: �����ɣ�����

pause